"use client";

import { motion } from "framer-motion";
import { useLeadFormModal } from "@/components/lp/LeadFormModal";

const DEFAULT_LABEL = "Book a FREE Discovery Call";

// Site-wide primary CTA. Opens the GoHighLevel lead-capture form.
export default function BrainAssessmentButton({
  className = "",
  label = DEFAULT_LABEL,
}: {
  className?: string;
  label?: string;
}) {
  const modal = useLeadFormModal();

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
      <button
        type="button"
        onClick={() => modal?.open()}
        className="inline-flex h-[52px] items-center justify-center whitespace-nowrap rounded-full bg-[#F3B42A] px-6 text-[13px] font-semibold tracking-tight text-ink sm:px-7 sm:text-sm"
      >
        {label}
      </button>
    </motion.div>
  );
}
