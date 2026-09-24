"use client";

import { useState } from "react";

type Patient = {
  id: number;
  email: string;
  client_id: string;
  created_at: string;
};

type WebhookEvent = {
  receivedAt: string;
  verified: boolean;
  payload: {
    event: string;
    client_id: string;
    protocol_session_uuid: string;
    completed_at: string;
    summary_report_id: number | null;
    report_ids: number[];
    output_statement: string | null;
  };
};

type TestResult = {
  registrationUrl: string;
  userCode: string;
  webhookEvent: WebhookEvent;
  patientsMode: "mock" | "live";
  patients: Patient[];
};

const inputClass = "mt-1 w-full rounded-lg border border-rule bg-white px-3 py-2 text-sm text-ink";
const cardClass = "rounded-xl border border-rule bg-white p-5";
const buttonClass =
  "w-full rounded-lg bg-amber px-4 py-3 text-sm font-semibold text-ink disabled:opacity-60";

function StepHeader({ number, title, doc }: { number: number; title: string; doc: string }) {
  return (
    <div className="mb-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber-b">
        Step {number} · {doc}
      </p>
      <h3 className="mt-1 font-sans text-lg font-semibold text-ink">{title}</h3>
    </div>
  );
}

// ─── Step 1: Auto-Registration Links ────────────────────────────────────────
function AutoRegistrationTest() {
  const [birthdate, setBirthdate] = useState("1990-01-01");
  const [gender, setGender] = useState<"" | "male" | "female">("");
  const [userCode, setUserCode] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [trialId, setTrialId] = useState("");
  const [salt, setSalt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; userCode: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/creyos-auto-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          birthdate,
          gender: gender || undefined,
          userCode: userCode || undefined,
          trialId: trialId || undefined,
          salt: salt || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Auto-registration failed.");
      setResult(data);
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cardClass}>
      <StepHeader number={1} title="Auto-Registration Link" doc="Auto-Registration" />
      <p className="mb-4 text-sm text-muted">
        Creates a signed link and opens the Creyos assessment in a new tab.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-ink">
            Date of birth
          </label>
          <input
            id="birthdate"
            type="date"
            required
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-ink">
            Gender (optional)
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

        <div>
          <label htmlFor="userCode" className="block text-sm font-medium text-ink">
            Patient name (Creyos user_code)
          </label>
          <input
            id="userCode"
            type="text"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="e.g. Jane Doe"
            className={inputClass}
          />
        </div>

        <div className="rounded-lg border border-rule">
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-ink"
          >
            <span>Use my own Creyos credentials (optional)</span>
            <span className="text-muted">{showAdvanced ? "−" : "+"}</span>
          </button>
          {showAdvanced && (
            <div className="space-y-3 border-t border-rule p-3">
              <p className="text-xs text-muted">
                Leave blank to use the built-in demo values. Enter your real Trial ID and
                Auto-Registration Salt from Creyos to open a working assessment.
              </p>
              <div>
                <label htmlFor="trialId" className="block text-xs font-medium text-ink">
                  Trial ID
                </label>
                <input
                  id="trialId"
                  type="text"
                  value={trialId}
                  onChange={(e) => setTrialId(e.target.value)}
                  placeholder="Leave blank to use CREYOS_TRIAL_NAME"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="salt" className="block text-xs font-medium text-ink">
                  Auto-Registration Salt
                </label>
                <input
                  id="salt"
                  type="text"
                  value={salt}
                  onChange={(e) => setSalt(e.target.value)}
                  placeholder="5baa9fc1…"
                  className={`${inputClass} font-mono`}
                />
              </div>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className={buttonClass}>
          {loading ? "Generating…" : "Generate & Open Assessment"}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      {result && (
        <div className="mt-4 rounded-lg border border-rule bg-paper-2 p-3 text-sm">
          <p className="text-ink">
            User code: <span className="font-mono">{result.userCode}</span>
          </p>
          <p className="mt-2 text-xs text-muted">Opened in a new tab. Direct link:</p>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block break-all font-mono text-xs text-ink underline"
          >
            {result.url}
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Step 2: REST API ───────────────────────────────────────────────────────
function RestApiTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"mock" | "live" | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  async function fetchPatients() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/creyos-patients");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Patient list fetch failed.");
      setMode(data.mode);
      setPatients(data.users ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cardClass}>
      <StepHeader number={2} title="Patient List" doc="REST API" />
      <p className="mb-4 text-sm text-muted">
        Authenticates with Creyos and fetches patients from{" "}
        <span className="font-mono text-xs">/api/v1/user/list/all</span>.
      </p>

      <button onClick={fetchPatients} disabled={loading} className={buttonClass}>
        {loading ? "Fetching…" : "Fetch Patients"}
      </button>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {mode && (
        <div className="mt-4">
          <span className="rounded-full bg-amber-soft px-2 py-0.5 text-xs font-medium text-ink">
            {mode === "mock" ? "Sample data" : "Live Creyos data"}
          </span>
          <p className="mt-2 text-xs text-muted">{patients.length} patients returned</p>
          <div className="mt-2 space-y-2">
            {patients.map((patient) => (
              <div key={patient.id} className="rounded border border-rule p-2 text-xs">
                <p className="text-ink">{patient.email}</p>
                <p className="text-muted">
                  client_id: <span className="font-mono">{patient.client_id}</span> · created{" "}
                  {patient.created_at}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 3: Webhooks ───────────────────────────────────────────────────────
function WebhookTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<WebhookEvent | null>(null);

  async function sendTestWebhook() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/creyos-webhook/self-test", { method: "POST" });
      if (!res.ok) throw new Error("Webhook self-test failed.");
      const eventsRes = await fetch("/api/creyos-webhook");
      const eventsData = await eventsRes.json();
      const latest: WebhookEvent | undefined = eventsData.events?.[0];
      if (!latest) throw new Error("Webhook event was not recorded.");
      setEvent(latest);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cardClass}>
      <StepHeader number={3} title="Webhook Delivery" doc="Webhooks" />
      <p className="mb-4 text-sm text-muted">
        Sends a signed sample payload to the webhook receiver and verifies the{" "}
        <span className="font-mono text-xs">X-Creyos-Signature</span>.
      </p>

      <button onClick={sendTestWebhook} disabled={loading} className={buttonClass}>
        {loading ? "Sending…" : "Send Test Webhook"}
      </button>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {event && (
        <div className="mt-4">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              event.verified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {event.verified ? "Signature verified" : "Signature invalid"}
          </span>
          <p className="mt-2 text-xs text-muted">Received at {event.receivedAt}</p>
          <pre className="mt-2 overflow-x-auto rounded bg-paper-2 p-3 text-xs text-ink">
            {JSON.stringify(event.payload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default function CreyosTestPanel() {
  return (
    <section className="border-y-4 border-dashed border-amber bg-paper-2 py-16">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber-b">
            Temporary: Creyos Integration Test
          </p>
          <h2 className="mt-2 font-sans text-2xl font-semibold text-ink">
            Test Creyos Integration
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Three separate tests, one per Creyos doc. Run each step and check its result below.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <AutoRegistrationTest />
          <RestApiTest />
          <WebhookTest />
        </div>
      </div>
    </section>
  );
}
