"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function VirtualProgramBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink via-ink-2 to-ink text-paper">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-1/4 w-2/3 opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, rgba(248,180,43,0.28), rgba(17,28,46,0) 70%)",
        }}
        animate={{ x: [0, -40, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-32">
        <Reveal className="lg:col-span-7" offset={30}>
          <p className="font-mono font-medium text-[13px] uppercase tracking-[0.18em] text-amber-b">
            The Future of the Practice
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-paper sm:text-5xl">
            The same 30-year method, now from anywhere in the country.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
            Our Virtual Program brings the neurometabolic investigation home.
            You start with a remote QEEG brain-training unit tuned to your
            own healing frequencies and a weekly neurological support
            program, with Dr. Santucci reviewing your data and adjusting
            your protocol on a call every 4 weeks. It&apos;s how we&apos;re
            extending this work beyond Los Gatos: the same root-cause
            approach, delivered remotely, wherever you are.
          </p>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="shrink-0"
            >
              <Link
                href="/programs/virtual"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-amber to-amber-b px-7 py-3.5 text-sm font-medium tracking-tight text-ink shadow-[0_10px_36px_-10px_rgba(248,180,43,0.55)] transition-shadow duration-300 hover:shadow-[0_20px_52px_-12px_rgba(248,180,43,0.8)]"
              >
                Explore the Virtual Program
              </Link>
            </motion.div>
            <Link
              href="/programs/virtual"
              className="text-sm text-paper/70 underline decoration-amber-b/50 decoration-1 underline-offset-4 transition-colors hover:text-amber-b hover:decoration-amber-b"
            >
              Not local? Start remotely.
            </Link>
          </div>
        </Reveal>

        <Reveal
          className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center"
          delay={200}
          offset={30}
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-paper/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
            <Image
              src="/images/virtual-program.webp"
              alt="A patient using a remote QEEG headset during a virtual visit with Dr. Santucci"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
