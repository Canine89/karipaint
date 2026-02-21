"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1674500197236-a9baa14a697e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE2NDk0NjB8&ixlib=rb-4.1.0&q=80&w=1080";

interface HeroProps {
  variant?: "full" | "centered" | "compact";
  title?: string;
  subtitle?: string;
  showCta?: boolean;
  heroImageUrl?: string;
}

export function Hero({
  variant = "full",
  title = "공간의 가치를 높이는, 내 손으로 완성하는",
  subtitle = "2대째 이어진 도장 시공",
  showCta = true,
  heroImageUrl,
}: HeroProps) {
  const imageUrl = heroImageUrl || DEFAULT_HERO_IMAGE;
  const isCompact = variant === "compact";

  return (
    <section className="bg-[#722F37] overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 py-12 md:py-16">
        <div
          className={
            "flex flex-col md:flex-row items-center gap-8 md:gap-12 " +
            (variant === "centered" ? "max-w-2xl mx-auto text-center" : "")
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={
              "flex flex-col gap-4 flex-1 " +
              (variant === "centered" ? "items-center" : "")
            }
          >
            <h1
              className={`font-bold text-white ${isCompact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"} leading-tight`}
            >
              {title}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-white/90 ${isCompact ? "text-base" : "text-lg md:text-xl"}`}
            >
              {subtitle}
            </motion.p>
            {showCta && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button
                  asChild
                  size={isCompact ? "default" : "lg"}
                  className="mt-2 w-fit bg-[#B8860B] hover:bg-[#B8860B]/90 text-white border-0 transition-transform hover:scale-105"
                >
                  <Link
                    href={siteConfig.links.kakao}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    견적 문의하기
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-[280px] flex-shrink-0"
          >
            <div className="relative aspect-[4/3] md:aspect-[280/200] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt="도장 시공 완료 공간"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 280px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
