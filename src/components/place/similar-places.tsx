import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { Place } from "@/types/place";
import { getPlacePalette } from "@/lib/place-palette";

type SimilarPlacesProps = {
  places: Place[];
};

export function SimilarPlaces({ places }: SimilarPlacesProps) {
  if (places.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 pb-20">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
        Similar feeling
      </p>

      <h2 className="mt-2 text-[42px] font-semibold leading-none tracking-[-0.075em] text-black">
        More places like this.
      </h2>

      <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-4">
        {places.map((place) => {
          const palette = getPlacePalette(place);

          return (
            <Link
              key={place.id}
              href={`/places/${place.id}`}
              className="group w-[270px] shrink-0 overflow-hidden rounded-[30px]"
              style={{ backgroundColor: palette.surface }}
            >
              <div className="relative h-[230px]">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  sizes="270px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>

              <div className="p-5">
                <div
                  className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: palette.accent }}
                >
                  <MapPin size={10} />
                  {place.area}
                </div>

                <h3 className="mt-3 text-[28px] font-semibold leading-[0.95] tracking-[-0.065em] text-black">
                  {place.name}
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-black/45">
                    ★ {place.rating}
                  </span>

                  <span className="flex size-10 items-center justify-center rounded-full bg-white">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
