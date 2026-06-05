"use client";

import { useMemo, useState } from "react";

import { places } from "@/data/places";
import { useSavedPlaces } from "@/hooks/use-saved-places";
import type { Place } from "@/types/place";

import { PlacePreview } from "@/components/home/place-preview";
import { PlaceShowcase } from "@/components/home/place-showcase";
import { SavedPlacesDrawer } from "@/components/home/saved-places-drawer";
import { SearchOverlay } from "@/components/home/search-overlay";
import { SiteHeader } from "@/components/home/site-header";

export function HomeExperience() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { savedPlaceIds, toggleSavedPlace, removeSavedPlace } =
    useSavedPlaces();

  const savedPlaces = useMemo(
    () => places.filter((place) => savedPlaceIds.includes(place.id)),
    [savedPlaceIds],
  );

  function openPlacePreview(place: Place) {
    setSelectedPlace(place);
    setSearchOpen(false);
    setSavedOpen(false);
  }

  return (
    <>
      <SiteHeader
        savedCount={savedPlaceIds.length}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSaved={() => setSavedOpen(true)}
      />

      <PlaceShowcase
        searchQuery={searchQuery}
        savedPlaceIds={savedPlaceIds}
        onToggleSavedPlace={toggleSavedPlace}
        onOpenPreview={openPlacePreview}
      />

      <SearchOverlay
        open={searchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={() => setSearchOpen(false)}
        onSelectPlace={openPlacePreview}
      />

      <SavedPlacesDrawer
        open={savedOpen}
        savedPlaces={savedPlaces}
        onClose={() => setSavedOpen(false)}
        onSelectPlace={openPlacePreview}
        onRemovePlace={removeSavedPlace}
      />

      <PlacePreview
        place={selectedPlace}
        saved={selectedPlace ? savedPlaceIds.includes(selectedPlace.id) : false}
        onClose={() => setSelectedPlace(null)}
        onToggleSaved={() => {
          if (selectedPlace) {
            toggleSavedPlace(selectedPlace.id);
          }
        }}
      />
    </>
  );
}
