"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin, MapPinOff, Search, X } from "lucide-react";

import { places } from "@/data/places";
import { filterPlaces } from "@/lib/filter-places";
import type { Place } from "@/types/place";

import { getPlacePalette } from "@/lib/place-palette";

type SearchOverlayProps = {
  open: boolean;
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
  onSelectPlace: (place: Place) => void;
};

const suggestedSearches = [
  "Cute date",
  "Study",
  "Going out",
  "Good food",
  "Braamfontein",
  "Outdoor",
];

export function SearchOverlay({
  open,
  query,
  onQueryChange,
  onClose,
  onSelectPlace,
}: SearchOverlayProps) {
  const cleanQuery = query.trim();

  const results = filterPlaces({
    places,
    query,
    mood: "All",
    area: "All areas",
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#fcfcfb]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mx-auto flex h-full max-w-[1180px] flex-col px-5 py-5 sm:px-8 md:px-12 md:py-9">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[12px] font-semibold text-black">
                Search SPOTTED
              </p>

              <button
                type="button"
                aria-label="Close search"
                onClick={onClose}
                className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2] transition-colors hover:bg-[#e8e8e4]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-10 flex min-w-0 items-center gap-3 border-b border-black/10 pb-4 sm:mt-12 sm:gap-4 sm:pb-5">
              <Search size={22} className="shrink-0 text-black sm:size-7" />

              <div className="relative min-w-0 flex-1">
                {!query && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center font-semibold leading-none tracking-[-0.06em] text-black/18"
                  >
                    <span className="text-[32px] sm:hidden">
                      Search places...
                    </span>

                    <span className="hidden text-[46px] sm:block md:text-[64px] lg:text-[76px]">
                      Search places, moods, areas...
                    </span>
                  </div>
                )}

                <input
                  value={query}
                  onChange={(event) => onQueryChange(event.target.value)}
                  autoFocus
                  aria-label="Search places, moods and areas"
                  className="relative z-10 w-full min-w-0 bg-transparent text-[32px] font-semibold leading-none tracking-[-0.06em] text-black outline-none sm:text-[46px] md:text-[64px] lg:text-[76px]"
                />
              </div>
            </div>

            <div className="no-scrollbar flex-1 overflow-y-auto pb-10">
              <div className="mt-5 flex flex-wrap gap-2">
                {suggestedSearches.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => onQueryChange(suggestion)}
                    className="rounded-full bg-[#f2f0ea] px-4 py-3 text-[11px] font-semibold text-black/50 transition-colors hover:bg-[var(--accent)] hover:text-black"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                    {cleanQuery ? "Search results" : "Places to explore"}
                  </p>

                  <p className="mt-2 text-[13px] font-medium text-black/45">
                    {results.length} {results.length === 1 ? "place" : "places"}{" "}
                    found
                  </p>
                </div>

                {cleanQuery && (
                  <button
                    type="button"
                    onClick={() => onQueryChange("")}
                    className="rounded-full bg-[#f2f0ea] px-4 py-2.5 text-[11px] font-semibold text-black/50 transition-colors hover:bg-black hover:text-white"
                  >
                    Clear search
                  </button>
                )}
              </div>

              {results.length > 0 ? (
                <motion.div
                  layout
                  className="mt-5 grid auto-rows-max content-start gap-3 md:grid-cols-2"
                >
                  {results.map((place) => {
                    const palette = getPlacePalette(place);

                    return (
                      <motion.button
                        layout
                        key={place.id}
                        type="button"
                        onClick={() => onSelectPlace(place)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ backgroundColor: palette.surface }}
                        className="group relative grid min-h-[112px] w-full grid-cols-[88px_minmax(0,1fr)_38px] items-center gap-3 overflow-hidden rounded-[26px] p-3 text-left transition-transform duration-300 hover:-translate-y-0.5 sm:grid-cols-[98px_minmax(0,1fr)_42px]"
                      >
                        <span
                          className="absolute bottom-0 left-0 top-0 w-[3px]"
                          style={{ backgroundColor: palette.accent }}
                        />

                        <div className="relative size-[88px] shrink-0 overflow-hidden rounded-[21px] sm:size-[98px]">
                          <Image
                            src={place.image}
                            alt={place.name}
                            fill
                            sizes="98px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="min-w-0">
                          <div
                            className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                            style={{ color: palette.accent }}
                          >
                            <MapPin size={10} />

                            <span className="truncate">{place.area}</span>
                          </div>

                          <h3 className="mt-2 line-clamp-2 text-[22px] font-semibold leading-[0.96] tracking-[-0.06em] text-black sm:text-[25px]">
                            {place.name}
                          </h3>

                          <div className="mt-2 flex min-w-0 items-center gap-2 text-[10px] font-medium text-black/40">
                            <span className="shrink-0">★ {place.rating}</span>

                            <span className="size-1 shrink-0 rounded-full bg-black/20" />

                            <span className="truncate">
                              {place.moods.slice(0, 2).join(" · ")}
                            </span>
                          </div>
                        </div>

                        <span
                          className="flex size-9 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45 sm:size-10"
                          style={{ backgroundColor: palette.accent }}
                        >
                          <ArrowUpRight size={15} />
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="mt-5 flex min-h-[300px] items-center justify-center rounded-[28px] bg-[#f2f0ea] px-6 text-center">
                  <div className="max-w-[320px]">
                    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-white">
                      <MapPinOff size={17} />
                    </span>

                    <h3 className="mt-5 text-[30px] font-semibold leading-[0.96] tracking-[-0.065em] text-black">
                      We could not find that place.
                    </h3>

                    <p className="mt-4 text-[12px] leading-relaxed text-black/45">
                      Try searching for another area, mood, or activity. The
                      place may also not have been registered yet.
                    </p>

                    <button
                      type="button"
                      onClick={() => onQueryChange("")}
                      className="mt-6 rounded-full bg-black px-5 py-3 text-[11px] font-semibold text-white"
                    >
                      Explore all places
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
