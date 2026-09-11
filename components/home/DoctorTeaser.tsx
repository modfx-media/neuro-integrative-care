"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Reveal from "@/components/Reveal";

const CREDENTIALS = [
  { value: "30", label: "Years in Practice" },
  { value: "11", label: "Colleges Attended" },
  { value: "10,000+", label: "Hours Advanced Training" },
  { value: "500", label: "Doctors per Lecture" },
] as const;

const pillContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const pillItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function DoctorTeaser() {
  return (
    <section className="bg-paper-2 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <h2 className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-amber">
                The Doctor
              </h2>
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 bg-rule lg:block"
              />
            </div>

            <div className="relative mt-6 aspect-[4/5] overflow-hidden rounded-2xl border border-rule">
              <Image
                src="/images/dr-santucci.webp"
                alt="Dr. Thomas Santucci"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delay={120} offset={24} className="relative lg:col-span-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-3 -top-10 select-none font-serif text-[7rem] italic leading-none text-ink/[0.06] lg:-left-6 lg:-top-14 lg:text-[10rem]"
            >
              &ldquo;
            </span>
            <p className="relative mt-[3.25rem] font-serif text-[1.55rem] leading-[1.4] text-ink sm:text-[1.8rem] lg:mt-[2.75rem] lg:text-[2.05rem]">
              30 years. 11 colleges. 10,000+ hours of advanced training in
              functional medicine, functional neurology, and regenerative
              medicine. A published book, a second on the way, and a standing
              invitation to lecture on Alzheimer&apos;s to rooms of 500
              doctors. Dr. Thomas Santucci built this practice on one
              promise:{" "}
              <span className="italic text-amber">
                he doesn&apos;t diagnose anything he can&apos;t help.
              </span>
            </p>

            <motion.dl
              className="mt-10 flex flex-wrap gap-3 border-t border-rule pt-8"
              variants={pillContainer}
              initial="hidden"
              animate="visible"
            >
              {CREDENTIALS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={pillItem}
                  className="flex items-baseline gap-2 rounded-full border border-rule bg-white px-5 py-2.5"
                >
                  <dt className="font-mono text-lg font-semibold text-ink">
                    {item.value}
                  </dt>
                  <dd className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>

            <Link
              href="/about/dr-thomas-santucci"
              className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-amber"
            >
              Meet the doctor
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
