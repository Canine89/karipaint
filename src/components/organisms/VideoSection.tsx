"use client";

import { motion } from "framer-motion";
import type { Video } from "@/lib/domain/types";

function extractYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

interface VideoSectionProps {
  items: Video[];
  limit?: number;
}

export function VideoSection({ items, limit }: VideoSectionProps) {
  const displayItems = limit ? items.slice(0, limit) : items;

  if (displayItems.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#F5F3EE]">
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            시공 현장 영상
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            실제 시공 과정을 영상으로 확인하세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {displayItems.map((video, i) => {
            const videoId = extractYoutubeId(video.youtubeUrl);
            if (!videoId) return null;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="space-y-3"
              >
                <div className="aspect-video rounded-lg overflow-hidden border border-border bg-black shadow-sm">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm md:text-base">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
