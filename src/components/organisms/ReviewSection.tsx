"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Review } from "@/lib/domain/types";

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface ReviewSectionProps {
  items: Review[];
  limit?: number;
}

export function ReviewSection({ items, limit = 6 }: ReviewSectionProps) {
  const displayItems = useMemo(
    () => shuffle(items).slice(0, limit),
    [items, limit]
  );

  if (displayItems.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-48px" }}
        transition={{ duration: 0.5 }}
        className="py-10 md:py-12 bg-[#F5F3EE]"
      >
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-6">
            고객 후기
          </h2>
          <p className="text-[#4A4540] text-sm md:text-base">
            등록된 후기가 없습니다.
          </p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5 }}
      className="py-10 md:py-12 bg-[#F5F3EE]"
    >
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-8">
          고객 후기
        </h2>
        <div className="flex flex-col gap-6">
          {displayItems.map((item, i) => {
            const alignRight = i % 2 === 1;
            const widthVariants = ["md:max-w-[95%]", "md:max-w-[88%]", "md:max-w-[80%]", "md:max-w-[92%]", "md:max-w-[85%]", "md:max-w-[78%]"];
            const widthClass = widthVariants[i % widthVariants.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: alignRight ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`flex ${alignRight ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`${widthClass} w-full rounded-xl bg-white/80 p-5 md:p-6 shadow-sm border border-[#E5E0D9]/50`}
                >
                  <p className="text-[#4A4540] text-sm md:text-base leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-xs md:text-sm text-[#6B6359]">
                    — {item.author}
                    {item.spaceType && (
                      <span className="text-[#6B6359]/70"> · {item.spaceType}</span>
                    )}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
