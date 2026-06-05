"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { places } from "@/data/places";
import { filterPlaces } from "@/lib/filter-places";
import type { Place } from "@/types/place";

import { DiscoveryToolbar } from "@/components/home/discovery-toolbar";
import { EmptyDiscoveryState } from "@/components/home/empty-discovery-state";
import { PlaceCategoryRow } from "@/components/home/place-category-row";

type PlaceShowcaseProps = {
  searchQuery: string;
  savedPlaceIds: string[];
  onToggleSavedPlace: (placeId: string) => void;
  onOpenPreview: (place: Place) => void;
};

type CategorySection = {
  id: string;
  title: string;
  description: string;
  categories: string[];
};

const categorySections: CategorySection[] = [
  {
    id: "nightlife",
    title: "Nightlife & groups",
    description:
      "Places for music, friends, late nights and memorable evenings.",
    categories: ["Nightlife", "Groups"],
  },
  {
    id: "food",
    title: "Food worth trying",
    description:
      "Restaurants, hidden food spots and places people keep recommending.",
    categories: ["Food", "Dining"],
  },
  {
    id: "coffee-study",
    title: "Coffee & study",
    description:
      "Quiet corners, reliable Wi-Fi and places where you can stay productive.",
    categories: ["Coffee", "Study"],
  },
  {
    id: "outdoors",
    title: "Outdoor escapes",
    description:
      "Fresh air, calm spaces and somewhere to slow everything down.",
    categories: ["Outdoors"],
  },
  {
    id: "culture",
    title: "Art & culture",
    description:
      "Creative spaces, exhibitions and interesting places around the city.",
    categories: ["Art", "Culture"],
  },
];

export function PlaceShowcase({
  searchQuery,
  savedPlaceIds,
  onToggleSavedPlace,
  onOpenPreview,
}: PlaceShowcaseProps) {
  const [activePlaceId, setActivePlaceId] = useState(places[0].id);
  const [activeMood, setActiveMood] = useState("All");
  const [activeArea, setActiveArea] = useState("All areas");

  const visiblePlaces = useMemo(
    () =>
      filterPlaces({
        places,
        query: searchQuery,
        mood: activeMood,
        area: activeArea,
      }),
    [searchQuery, activeMood, activeArea],
  );

  const visibleSections = useMemo(() => {
    const sections = categorySections
      .map((section) => ({
        ...section,
        places: visiblePlaces.filter((place) =>
          section.categories.some((category) =>
            place.categories.includes(category),
          ),
        ),
      }))
      .filter((section) => section.places.length > 0);

    const groupedPlaceIds = new Set(
      sections.flatMap((section) => section.places.map((place) => place.id)),
    );

    const uncategorisedPlaces = visiblePlaces.filter(
      (place) => !groupedPlaceIds.has(place.id),
    );

    if (uncategorisedPlaces.length > 0) {
      sections.push({
        id: "more",
        title: "More to explore",
        description:
          "More places selected by the community for your current mood.",
        categories: [],
        places: uncategorisedPlaces,
      });
    }

    return sections;
  }, [visiblePlaces]);

  const resolvedActivePlaceId = visiblePlaces.some(
    (place) => place.id === activePlaceId,
  )
    ? activePlaceId
    : (visiblePlaces[0]?.id ?? "");

  function handleMoodChange(mood: string) {
    setActiveMood(mood);
  }

  function handleAreaChange(area: string) {
    setActiveArea(area);
  }

  return (
    <section className="pt-14 md:pt-20">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
        Find your next story
      </p>

      <div className="mt-6">
        <h1 className="max-w-[830px] text-[48px] font-semibold leading-[0.92] tracking-[-0.075em] text-black sm:text-[64px] md:text-[76px]">
          Places that match
          <br />
          the moment.
        </h1>

        <AnimatePresence mode="wait">
          <motion.p
            key={`${activeMood}-${activeArea}-${visiblePlaces.length}`}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.25 }}
            className="mt-6 max-w-[520px] text-[13px] leading-relaxed text-black/45"
          >
            Showing{" "}
            <span className="font-semibold text-black">
              {visiblePlaces.length}
            </span>{" "}
            {visiblePlaces.length === 1 ? "place" : "places"} for{" "}
            <span className="font-semibold text-black">
              {activeMood === "All" ? "every mood" : activeMood}
            </span>
            {activeArea !== "All areas" && (
              <>
                {" "}
                around{" "}
                <span className="font-semibold text-black">{activeArea}</span>
              </>
            )}
            .
          </motion.p>
        </AnimatePresence>
      </div>

      <DiscoveryToolbar
        activeMood={activeMood}
        activeArea={activeArea}
        onMoodChange={handleMoodChange}
        onAreaChange={handleAreaChange}
      />

      {visiblePlaces.length === 0 ? (
        <EmptyDiscoveryState />
      ) : (
        <div className="pb-16">
          {visibleSections.map((section) => (
            <PlaceCategoryRow
              key={section.id}
              title={section.title}
              description={section.description}
              places={section.places}
              activePlaceId={resolvedActivePlaceId}
              savedPlaceIds={savedPlaceIds}
              onSelectPlace={setActivePlaceId}
              onOpenPreview={onOpenPreview}
              onToggleSavedPlace={onToggleSavedPlace}
            />
          ))}
        </div>
      )}
    </section>
  );
}
