"use client";

import { motion } from "framer-motion";
import { Home, Paintbrush, Sparkles } from "lucide-react";

const BADGES = [
  { label: "2대 계승", icon: Home },
  { label: "기술 기반", icon: Paintbrush },
  { label: "고객 만족", icon: Sparkles },
] as const;

const container = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function TrustBadges() {
  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-48px" }}
      variants={container}
      className="py-10 md:py-12 bg-white"
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          {BADGES.map(({ label, icon: Icon }) => (
            <motion.div
              key={label}
              variants={item}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-sm md:text-base text-[#6B6359]"
            >
              <Icon className="h-4 w-4 text-[#722F37]/60 shrink-0" strokeWidth={1.5} />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
