"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import type { Portfolio } from "@/lib/domain/types";

interface PortfolioPreviewProps {
  items: Portfolio[];
  limit?: number;
}

export function PortfolioPreview({ items, limit = 3 }: PortfolioPreviewProps) {
  const displayItems = items.slice(0, limit);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5 }}
      className="py-10 md:py-12"
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            작업 결과물
          </h2>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-fit text-muted-foreground hover:text-foreground p-0 h-auto transition-all hover:translate-x-1"
          >
            <Link href="/portfolio" className="flex items-center gap-1">
              전체보기
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/portfolio#${item.id}`} className="block group">
                <motion.div
                  className="relative rounded-xl overflow-hidden bg-muted/30 shadow-md"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.2)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized={item.imageUrl.includes("placehold.co")}
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white font-medium text-sm drop-shadow-md">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
