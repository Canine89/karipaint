"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface InquiryBannerProps {
  compact?: boolean;
}

export function InquiryBanner({ compact = false }: InquiryBannerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5 }}
      className="py-10 md:py-12 bg-[#722F37]"
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            편한 방법으로 문의하세요
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size={compact ? "default" : "lg"}
                className="h-12 w-[180px] rounded-lg bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/90 border-0"
              >
                <Link
                  href={siteConfig.links.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  카카오톡
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size={compact ? "default" : "lg"}
                className="h-12 w-[180px] rounded-lg bg-[#E4405F] text-white hover:bg-[#E4405F]/90 border-0"
              >
                <Link
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  인스타 DM
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size={compact ? "default" : "lg"}
                className="h-12 w-[180px] rounded-lg bg-[#03C75A] text-white hover:bg-[#03C75A]/90 border-0"
              >
                <Link
                  href={siteConfig.links.naverTalk}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  네이버 톡톡
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
