"use client";

import { motion } from "framer-motion";

export const fadeUpVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export const defaultTransition = { duration: 0.5 };

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateIn({ children, className, delay = 0 }: AnimateInProps) {
  return (
    <motion.div
      initial={fadeUpVariants.initial}
      whileInView={fadeUpVariants.animate}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
