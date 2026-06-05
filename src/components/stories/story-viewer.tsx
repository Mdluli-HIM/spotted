"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Heart, X } from "lucide-react";

import type { CommunityStory } from "@/types/story";
import Link from "next/link";

type StoryViewerProps = {
  open: boolean;
  story: CommunityStory | null;
  activeIndex: number;
  totalStories: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function StoryViewer({
  open,
  story,
  activeIndex,
  totalStories,
  onClose,
  onNext,
  onPrevious,
}: StoryViewerProps) {
  return (
    <AnimatePresence>
      {open && story && (
        <motion.div
          className="fixed inset-0 z-[70] bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 p-4">
            {Array.from({ length: totalStories }).map((_, index) => (
              <div
                key={index}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
              >
                <div
                  className={`h-full rounded-full bg-white ${
                    index <= activeIndex ? "w-full" : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          <Image
            src={story.media.url}
            alt={story.placeName}
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/80" />

          <button
            type="button"
            aria-label="Close story"
            onClick={onClose}
            className="absolute right-4 top-9 z-30 flex size-11 items-center justify-center rounded-full bg-white/14 backdrop-blur-xl"
          >
            <X size={18} />
          </button>

          <div className="absolute left-4 right-4 top-20 z-20 flex items-center gap-3">
            <div className="relative size-10 overflow-hidden rounded-full border border-white/40">
              <Image
                src={story.user.avatar}
                alt={story.user.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[13px] font-semibold">{story.user.name}</p>
              <p className="text-[11px] text-white/55">{story.createdAt}</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous story"
            onClick={onPrevious}
            className="absolute bottom-1/2 left-3 z-30 hidden size-11 translate-y-1/2 items-center justify-center rounded-full bg-white/14 backdrop-blur-xl md:flex"
          >
            <ArrowLeft size={17} />
          </button>

          <button
            type="button"
            aria-label="Next story"
            onClick={onNext}
            className="absolute bottom-1/2 right-3 z-30 hidden size-11 translate-y-1/2 items-center justify-center rounded-full bg-white/14 backdrop-blur-xl md:flex"
          >
            <ArrowRight size={17} />
          </button>

          <button
            type="button"
            aria-label="Previous story"
            onClick={onPrevious}
            className="absolute bottom-0 left-0 top-28 z-10 w-1/2 md:hidden"
          />

          <button
            type="button"
            aria-label="Next story"
            onClick={onNext}
            className="absolute bottom-0 right-0 top-28 z-10 w-1/2 md:hidden"
          />

          <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              {story.moods.slice(0, 3).map((mood) => (
                <span
                  key={mood}
                  className="rounded-full bg-white/16 px-3 py-2 text-[10px] font-semibold backdrop-blur-xl"
                >
                  {mood}
                </span>
              ))}
            </div>

            <h2 className="max-w-[560px] text-[48px] font-semibold leading-[0.9] tracking-[-0.075em] md:text-[72px]">
              {story.placeName}
            </h2>

            <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-white/75">
              “{story.caption}”
            </p>

            <div className="mt-6 flex gap-2">
              <Link
                href={`/places/${story.placeId}`}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-semibold text-black"
              >
                Open place
                <ExternalLink size={14} />
              </Link>

              <button className="flex size-11 items-center justify-center rounded-full bg-white/16 backdrop-blur-xl">
                <Heart size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
