"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const inputClass =
  "mt-2 w-full rounded-lg border border-rule bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-amber";
const labelClass = "block text-sm font-medium text-ink";

export default function BrainAssessmentForm() {
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState<"" | "male" | "female">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessmentUrl, setAssessmentUrl] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/creyos-auto-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthdate, gender: gender || undefined }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Something went wrong. Please try again.");
      setAssessmentUrl(data.url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (assessmentUrl) {
    return (
      <div className="rounded-2xl border border-rule/70 bg-paper-2 p-3 sm:p-4">
        <p className="px-2 pt-2 text-center text-sm text-muted">
          Your assessment is ready. Complete the tasks below — if the window
          doesn&apos;t load,{" "}
          <a
            href={assessmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-amber underline-offset-2 hover:underline"
          >
            open it in a new tab
          </a>
          .
        </p>
        <iframe
          src={assessmentUrl}
          title="Free Creyos brain assessment"
          className="mt-4 h-[min(80vh,880px)] w-full rounded-xl border border-rule bg-white"
          allow="camera; microphone; fullscreen"
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-rule/70 bg-paper-2 p-6 sm:p-8"
    >
      <div>
        <label htmlFor="birthdate" className={labelClass}>
          Date of birth
        </label>
        <input
          id="birthdate"
          type="date"
          required
          max={new Date().toISOString().slice(0, 10)}
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="gender" className={labelClass}>
          Gender <span className="font-normal text-muted">(optional)</span>
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value as "" | "male" | "female")}
          className={inputClass}
        >
          <option value="">Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.85)] disabled:opacity-60"
      >
        {loading ? "Preparing your assessment…" : "Start My Free Brain Assessment"}
      </button>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <p className="mt-5 text-xs leading-relaxed text-muted">
        You&apos;ll start a secure session with our assessment partner, Creyos.
        The first visit creates your assessment account; later visits reopen
        the same one. No prescriptions, no obligation — just objective data
        on how your brain is performing today.
      </p>
    </form>
  );
}
