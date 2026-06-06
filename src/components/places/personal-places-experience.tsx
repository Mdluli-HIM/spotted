"use client";

import { useMemo, useState } from "react";
import { Bookmark, CheckCircle2, Menu, Search } from "lucide-react";

import { places } from "@/data/places";
import { useSavedPlaces } from "@/hooks/use-saved-places";
import { useVisitedPlaces } from "@/hooks/use-visited-places";

import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { AppMenu } from "@/components/navigation/app-menu";
import { PersonalPlaceCard } from "@/components/places/personal-place-card";

type PersonalPlacesExperienceProps = {
  mode: "saved" | "visited";
};

export function PersonalPlacesExperience({
  mode,
}: PersonalPlacesExperienceProps) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { savedPlaceIds, removeSavedPlace } = useSavedPlaces();

  const { visitedPlaceIds, toggleVisitedPlace } = useVisitedPlaces();

  const activeIds = mode === "saved" ? savedPlaceIds : visitedPlaceIds;

  const visiblePlaces = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    return places.filter((place) => {
      if (!activeIds.includes(place.id)) return false;

      if (!cleanQuery) return true;

      const searchableText = [
        place.name,
        place.area,
        place.description,
        ...place.categories,
        ...place.moods,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(cleanQuery);
    });
  }, [activeIds, query]);

  const isSavedMode = mode === "saved";

  const title = isSavedMode
    ? "Places worth remembering."
    : "Places you have experienced.";

  const description = isSavedMode
    ? "Keep places here while you plan where to go next."
    : "Return to places you visited and share your experience.";

  const Icon = isSavedMode ? Bookmark : CheckCircle2;

  return (
    <>
      <header className="sticky top-0 z-40 -mx-4 flex items-center justify-between bg-white/95 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0">
        <BrandWordmark />

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]"
        >
          <Menu size={18} />
        </button>
      </header>

      <main className="pb-20 pt-14 md:pt-20">
        <div className="max-w-[800px]">
          <span className="flex size-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
            <Icon size={18} />
          </span>

          <h1 className="mt-6 text-[52px] font-semibold leading-[0.9] tracking-[-0.075em] text-black sm:text-[76px]">
            {title}
          </h1>

          <p className="mt-6 max-w-[520px] text-[14px] leading-relaxed text-black/45">
            {description}
          </p>
        </div>

        <div className="mt-10 flex max-w-[520px] items-center gap-3 rounded-full bg-[#f4f4f2] px-5 py-4">
          <Search size={16} className="shrink-0 text-black/35" />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your places..."
            className="w-full min-w-0 bg-transparent text-[13px] font-medium outline-none placeholder:text-black/30"
          />
        </div>

        {visiblePlaces.length > 0 ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visiblePlaces.map((place) => (
              <PersonalPlaceCard
                key={place.id}
                place={place}
                removeLabel={
                  isSavedMode ? "Remove saved place" : "Remove visited place"
                }
                onRemove={() => {
                  if (isSavedMode) {
                    removeSavedPlace(place.id);
                  } else {
                    toggleVisitedPlace(place.id);
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex min-h-[340px] items-center justify-center rounded-[30px] bg-[#f4f4f2] px-6 text-center">
            <div className="max-w-[360px]">
              <Icon size={20} className="mx-auto text-black/30" />

              <h2 className="mt-5 text-[34px] font-semibold leading-[0.94] tracking-[-0.065em] text-black">
                {query
                  ? "Nothing matches your search."
                  : isSavedMode
                    ? "You have not saved a place yet."
                    : "You have not marked a place as visited yet."}
              </h2>

              <p className="mt-4 text-[12px] leading-relaxed text-black/40">
                Discover places and they will appear here when you save or visit
                them.
              </p>
            </div>
          </div>
        )}
      </main>

      <AppMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
