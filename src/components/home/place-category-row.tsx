"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import type { Place } from "@/types/place";
import { PlaceCard } from "@/components/home/place-card";

type PlaceCategoryRowProps = {
  title: string;
  description: string;
  places: Place[];
  activePlaceId: string;
  savedPlaceIds: string[];
  onSelectPlace: (placeId: string) => void;
  onOpenPreview: (place: Place) => void;
  onToggleSavedPlace: (placeId: string) => void;
};

export function PlaceCategoryRow({
  title,
  description,
  places,
  activePlaceId,
  savedPlaceIds,
  onSelectPlace,
  onOpenPreview,
  onToggleSavedPlace,
}: PlaceCategoryRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  function scrollRow(direction: "left" | "right") {
    rowRef.current?.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  }

  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
            {places.length} {places.length === 1 ? "place" : "places"}
          </p>

          <h2 className="mt-2 text-[32px] font-semibold leading-none tracking-[-0.065em] text-black sm:text-[38px]">
            {title}
          </h2>

          <p className="mt-3 max-w-[470px] text-[12px] leading-relaxed text-black/40">
            {description}
          </p>
        </div>

        {places.length > 3 && (
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              aria-label={`View previous ${title} places`}
              onClick={() => scrollRow("left")}
              className="flex size-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              type="button"
              aria-label={`View more ${title} places`}
              onClick={() => scrollRow("right")}
              className="flex size-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={rowRef}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4 pr-5"
      >
        {places.map((place) => (
          <motion.div
            key={place.id}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="snap-start"
          >
            <PlaceCard
              place={place}
              active={activePlaceId === place.id}
              saved={savedPlaceIds.includes(place.id)}
              onSelect={() => onSelectPlace(place.id)}
              onOpenPreview={() => onOpenPreview(place)}
              onToggleSaved={() => onToggleSavedPlace(place.id)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
