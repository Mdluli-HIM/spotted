"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, X } from "lucide-react";

import type { Place } from "@/types/place";
import { getPlacePalette } from "@/lib/place-palette";
import { buildPlaceShareTarget } from "@/lib/share-links";
import { ShareButton } from "@/components/sharing/share-button";

type PersonalPlaceCardProps = {
  place: Place;
  removeLabel: string;
  onRemove: () => void;
};

export function PersonalPlaceCard({
  place,
  removeLabel,
  onRemove,
}: PersonalPlaceCardProps) {
  const palette = getPlacePalette(place);

  return (
    <article
      className="overflow-hidden rounded-[28px]"
      style={{ backgroundColor: palette.surface }}
    >
      <Link href={`/places/${place.id}`} className="group block">
        <div className="relative h-[240px] overflow-hidden">
          <Image
            src={place.image}
            alt={place.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[11px] font-semibold text-black backdrop-blur-md">
            ★ {place.rating}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div
          className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: palette.accent }}
        >
          <MapPin size={10} />
          {place.area}
        </div>

        <Link href={`/places/${place.id}`}>
          <h2 className="mt-3 text-[32px] font-semibold leading-[0.94] tracking-[-0.065em] text-black">
            {place.name}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-2 text-[12px] leading-relaxed text-black/45">
          {place.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            <ShareButton
              target={buildPlaceShareTarget(place)}
              iconOnly
              className="flex size-10 items-center justify-center rounded-full bg-white text-black"
            />

            <button
              type="button"
              aria-label={removeLabel}
              onClick={onRemove}
              className="flex size-10 items-center justify-center rounded-full bg-white text-black"
            >
              <X size={15} />
            </button>
          </div>

          <Link
            href={`/places/${place.id}`}
            className="flex size-10 items-center justify-center rounded-full bg-black text-white"
          >
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
