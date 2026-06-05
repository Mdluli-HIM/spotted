"use client";

import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import type { CommunityStory } from "@/types/story";

type StoryCardProps = {
  story: CommunityStory;
  active?: boolean;
  compact?: boolean;
  onClick?: () => void;
};

export function StoryCard({
  story,
  active = false,
  compact = false,
  onClick,
}: StoryCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: compact ? -2 : -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative shrink-0 overflow-hidden rounded-[34px] bg-black text-left text-white outline-none ${
        compact
          ? "h-[360px] w-[210px]"
          : active
            ? "h-[560px] w-[315px] shadow-[0_34px_90px_rgba(0,0,0,0.28)]"
            : "h-[430px] w-[245px] opacity-80"
      }`}
    >
      <Image
        src={story.media.url}
        alt={story.placeName}
        fill
        sizes={active ? "315px" : "245px"}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/75" />

      <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative size-8 overflow-hidden rounded-full border border-white/40">
            <Image
              src={story.user.avatar}
              alt={story.user.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[11px] font-semibold leading-none">
              {story.user.name}
            </p>
            <p className="mt-1 text-[9px] font-medium text-white/55">
              {story.createdAt}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-white/15 px-2.5 py-1.5 text-[9px] font-semibold backdrop-blur-md">
          ★ {story.rating}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="mb-3 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55">
          <MapPin size={10} />
          {story.placeArea}
        </div>

        <h3
          className={`font-semibold leading-[0.92] tracking-[-0.06em] ${
            compact ? "text-[28px]" : active ? "text-[40px]" : "text-[31px]"
          }`}
        >
          {story.placeName}
        </h3>

        {!compact && (
          <p className="mt-4 line-clamp-3 text-[13px] leading-relaxed text-white/72">
            “{story.caption}”
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {story.moods.slice(0, compact ? 1 : 2).map((mood) => (
            <span
              key={mood}
              className="rounded-full bg-white/16 px-3 py-2 text-[9px] font-semibold text-white backdrop-blur-md"
            >
              {mood}
            </span>
          ))}
        </div>

        {active && (
          <div className="mt-5 flex items-center justify-between rounded-full bg-white/14 p-1 pl-4 backdrop-blur-xl">
            <span className="text-[11px] font-semibold">
              {story.helpfulCount} found this helpful
            </span>

            <span className="flex size-9 items-center justify-center rounded-full bg-white text-black">
              <Heart size={15} />
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}
