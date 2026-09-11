"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// The single, site-wide primary CTA reused across every page banner/hero.
export default function BrainAssessmentButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.06, 1],
        boxShadow: [
          "0 10px 30px -8px rgba(243,180,42,0.55)",
          "0 22px 58px -10px rgba(243,180,42,0.95)",
          "0 10px 30px -8px rgba(243,180,42,0.55)",
        ],
      }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-block shrink-0 rounded-full ${className}`}
    >
      <Link
        href="/brain-assessment"
        className="inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full bg-[#F3B42A] px-7 text-sm font-semibold tracking-tight text-ink"
      >
        Take Your Free Brain Assessment
      </Link>
    </motion.div>
  );
}
