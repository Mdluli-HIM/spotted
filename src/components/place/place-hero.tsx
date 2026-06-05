import Image from "next/image";
import { Check, Eye, MapPin, Star } from "lucide-react";

import type { Place } from "@/types/place";
import { getPlacePalette } from "@/lib/place-palette";

type PlaceHeroProps = {
  place: Place;
  visited: boolean;
  onToggleVisited: () => void;
};

function priceLabel(level: Place["priceLevel"]) {
  return "R".repeat(level);
}

export function PlaceHero({ place, visited, onToggleVisited }: PlaceHeroProps) {
  const palette = getPlacePalette(place);

  return (
    <section className="pt-12 md:pt-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p
            className="inline-flex rounded-full px-4 py-2 text-[11px] font-semibold"
            style={{
              backgroundColor: palette.surface,
              color: palette.accent,
            }}
          >
            {place.openingStatus} · closes {place.closingTime}
          </p>

          <h1 className="mt-7 max-w-[780px] text-[56px] font-semibold leading-[0.88] tracking-[-0.08em] text-black sm:text-[82px] lg:text-[104px]">
            {place.name}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-[13px] font-medium text-black/45">
            <span className="flex items-center gap-2">
              <MapPin size={15} />
              {place.area} · {place.distanceKm} km away
            </span>

            <span className="size-1 rounded-full bg-black/20" />

            <span>{priceLabel(place.priceLevel)}</span>

            <span className="size-1 rounded-full bg-black/20" />

            <span>{place.reviewCount} stories</span>
          </div>

          <p className="mt-6 max-w-[540px] text-[16px] leading-relaxed text-black/55">
            {place.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {[...place.categories, ...place.moods.slice(0, 3)].map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#f4f4f2] px-4 py-3 text-[11px] font-semibold text-black/55"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onToggleVisited}
              className={`flex items-center gap-3 rounded-full px-5 py-4 text-[12px] font-semibold transition-colors ${
                visited
                  ? "bg-black text-white"
                  : "bg-[var(--accent)] text-black"
              }`}
            >
              {visited ? <Check size={15} /> : <Eye size={15} />}
              {visited ? "Visited" : "Mark as visited"}
            </button>

            <div className="flex items-center gap-3 rounded-full bg-[#f4f4f2] px-5 py-4 text-[12px] font-semibold text-black">
              <Star size={15} fill="currentColor" />
              {place.rating} community score
            </div>
          </div>
        </div>

        <div className="relative h-[460px] overflow-hidden rounded-[38px] bg-[#f4f4f2] md:h-[620px]">
          <Image
            src={place.image}
            alt={place.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 rounded-[28px] bg-white/14 p-5 text-white backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
              Latest story
            </p>

            <p className="mt-3 text-[18px] font-medium leading-snug tracking-[-0.035em]">
              “{place.latestStory.body}”
            </p>

            <p className="mt-3 text-[12px] font-semibold text-white/60">
              {place.latestStory.user} · {place.latestStory.time}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
