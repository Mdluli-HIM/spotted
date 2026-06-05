"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Heart, MapPin, X } from "lucide-react";

import type { Place } from "@/types/place";
import Link from "next/link";

type PlacePreviewProps = {
  place: Place | null;
  saved: boolean;
  onClose: () => void;
  onToggleSaved: () => void;
};

function priceLabel(level: Place["priceLevel"]) {
  return "R".repeat(level);
}

export function PlacePreview({
  place,
  saved,
  onClose,
  onToggleSaved,
}: PlacePreviewProps) {
  return (
    <AnimatePresence>
      {place && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="absolute bottom-0 right-0 top-0 flex w-full max-w-[520px] flex-col overflow-hidden bg-[#fcfcfb] shadow-[-30px_0_80px_rgba(0,0,0,0.12)] max-md:top-auto max-md:h-[92vh] max-md:max-w-none max-md:rounded-t-[34px]"
          >
            <div className="relative h-[42vh] min-h-[310px] overflow-hidden">
              <Image
                src={place.image}
                alt={place.name}
                fill
                sizes="520px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

              <button
                aria-label="Close preview"
                onClick={onClose}
                className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-white text-black"
              >
                <X size={18} />
              </button>

              <button
                aria-label={saved ? "Remove saved place" : "Save place"}
                onClick={onToggleSaved}
                className={`absolute left-5 top-5 flex size-11 items-center justify-center rounded-full ${
                  saved ? "bg-[#b8ff2c] text-black" : "bg-white text-black"
                }`}
              >
                <Heart size={17} fill={saved ? "currentColor" : "none"} />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-black">
                  ★ {place.rating} · {place.reviewCount} stories
                </p>

                <h2 className="max-w-[400px] text-[48px] font-semibold leading-[0.9] tracking-[-0.075em] text-white">
                  {place.name}
                </h2>
              </div>
            </div>

            <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-7">
              <div className="flex flex-wrap gap-2">
                {place.moods.map((mood) => (
                  <span
                    key={mood}
                    className="rounded-full bg-[#f2f0ea] px-4 py-2 text-[11px] font-semibold text-black/60"
                  >
                    {mood}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-[22px] bg-[#f2f0ea] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                    Area
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-black">
                    {place.area}
                  </p>
                </div>

                <div className="rounded-[22px] bg-[#f2f0ea] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                    Price
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-black">
                    {priceLabel(place.priceLevel)}
                  </p>
                </div>

                <div className="rounded-[22px] bg-[#f2f0ea] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30">
                    Status
                  </p>
                  <p className="mt-2 text-[13px] font-semibold text-black">
                    {place.openingStatus}
                  </p>
                </div>
              </div>

              <p className="mt-7 text-[15px] leading-relaxed text-black/60">
                {place.description}
              </p>

              <div className="mt-7 rounded-[26px] bg-[var(--accent)] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                  Latest story
                </p>

                <p className="mt-4 text-[18px] font-medium leading-snug tracking-[-0.03em] text-black">
                  “{place.latestStory.body}”
                </p>

                <p className="mt-4 text-[12px] font-semibold text-black/50">
                  {place.latestStory.user} · {place.latestStory.time}
                </p>
              </div>

              <div className="mt-7 flex items-center gap-3 rounded-[26px] bg-[#f2f0ea] p-5">
                <div className="flex size-11 items-center justify-center rounded-full bg-white">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-[13px] font-semibold text-black">
                    {place.address}
                  </p>
                  <p className="mt-1 text-[12px] text-black/45">
                    {place.distanceKm} km away · closes {place.closingTime}
                  </p>
                </div>
              </div>

              <Link
                href={`/places/${place.id}`}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-black px-5 py-4 text-[13px] font-semibold text-white"
              >
                View full place profile
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
