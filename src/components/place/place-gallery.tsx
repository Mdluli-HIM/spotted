"use client";

import Image from "next/image";
import { Camera } from "lucide-react";

import type { Place } from "@/types/place";

type PlaceGalleryProps = {
  place: Place;
  onOpenImage: (index: number) => void;
};

export function PlaceGallery({ place, onOpenImage }: PlaceGalleryProps) {
  return (
    <section className="mt-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
            Community photos
          </p>

          <h2 className="mt-2 text-[42px] font-semibold leading-none tracking-[-0.075em] text-black">
            Seen by the people who went.
          </h2>
        </div>

        <button className="hidden items-center gap-2 rounded-full bg-[#f4f4f2] px-5 py-3 text-[12px] font-semibold text-black md:flex">
          <Camera size={15} />
          Add photo
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1.4fr_0.8fr]">
        <button
          type="button"
          onClick={() => onOpenImage(0)}
          className="relative h-[420px] overflow-hidden rounded-[36px] bg-[#f4f4f2] md:h-[620px]"
        >
          <Image
            src={place.images[0]}
            alt={place.name}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        </button>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          {place.images.slice(1, 4).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => onOpenImage(index + 1)}
              className="relative h-[190px] overflow-hidden rounded-[30px] bg-[#f4f4f2] md:h-[194px]"
            >
              <Image
                src={image}
                alt={`${place.name} ${index + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
