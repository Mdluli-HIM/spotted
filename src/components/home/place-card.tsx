"use client";

import Image from "next/image";
import { ArrowUpRight, Heart, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import { getPlacePalette } from "@/lib/place-palette";
import type { Place } from "@/types/place";
import { ShareButton } from "@/components/sharing/share-button";
import { buildPlaceShareTarget } from "@/lib/share-links";

type PlaceCardProps = {
  place: Place;
  active: boolean;
  saved: boolean;
  onSelect: () => void;
  onOpenPreview: () => void;
  onToggleSaved: () => void;
};

export function PlaceCard({
  place,
  active,
  saved,
  onSelect,
  onOpenPreview,
  onToggleSaved,
}: PlaceCardProps) {
  const palette = getPlacePalette(place);

  return (
    <motion.article
      layout
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onSelect();
        }
      }}
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative h-[520px] w-[82vw] max-w-[320px] shrink-0 cursor-pointer overflow-hidden rounded-[30px] outline-none focus-visible:ring-2 focus-visible:ring-black sm:w-[310px] lg:w-[300px] xl:w-[320px]"
    >
      <span
        className="absolute inset-x-0 top-0 z-10 h-[3px]"
        style={{
          backgroundColor: active ? "#111111" : palette.accent,
        }}
      />

      <div
        className="flex h-[235px] flex-col justify-between p-5 transition-colors duration-500 sm:p-6"
        style={{
          backgroundColor: active ? "var(--accent)" : palette.surface,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex max-h-[32px] flex-wrap gap-2 overflow-hidden">
            {place.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="shrink-0 rounded-full bg-white/80 px-3 py-2 text-[10px] font-semibold text-black backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ShareButton
              target={buildPlaceShareTarget(place)}
              iconOnly
              className="flex size-9 items-center justify-center rounded-full bg-white/75 text-black transition-colors hover:bg-white"
            />

            <button
              type="button"
              aria-label={saved ? "Remove saved place" : "Save place"}
              onClick={(event) => {
                event.stopPropagation();
                onToggleSaved();
              }}
              className={`flex size-9 items-center justify-center rounded-full transition-all ${
                saved || active
                  ? "bg-black text-white"
                  : "text-black/60 hover:bg-black hover:text-white"
              }`}
              style={
                saved || active
                  ? undefined
                  : { backgroundColor: palette.accentSoft }
              }
            >
              <Heart size={15} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <div>
          <div
            className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: active ? "rgba(0,0,0,0.45)" : palette.accent }}
          >
            <MapPin size={12} />
          </div>

          <h2 className="h-[64px] overflow-hidden text-[31px] font-semibold leading-[0.98] tracking-[-0.065em] text-black">
            {place.name}
          </h2>

          <p className="mt-3 h-[51px] overflow-hidden text-[12px] leading-[1.42] text-black/55">
            {place.description}
          </p>
        </div>
      </div>

      <div className="relative h-[285px] overflow-hidden">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(max-width: 640px) 82vw, 320px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-2 text-[11px] font-semibold text-black backdrop-blur-md">
          ★ {place.rating}
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpenPreview();
          }}
          className="absolute bottom-5 left-5 flex items-center rounded-full bg-white/18 p-1 pl-4 text-white backdrop-blur-xl transition-transform hover:scale-[1.03]"
        >
          <span className="pr-3 text-[11px] font-medium">Explore place</span>

          <span className="flex size-9 items-center justify-center rounded-full bg-white text-black">
            <ArrowUpRight size={15} />
          </span>
        </button>
      </div>
    </motion.article>
  );
}
