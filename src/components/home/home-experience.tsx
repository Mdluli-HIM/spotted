"use client";

import { useMemo, useState } from "react";

import { places as basePlaces } from "@/data/places";
import { AppMenu } from "@/components/navigation/app-menu";
import { PlacePreview } from "@/components/home/place-preview";
import { PlaceShowcase } from "@/components/home/place-showcase";
import { SavedPlacesDrawer } from "@/components/home/saved-places-drawer";
import { SearchOverlay } from "@/components/home/search-overlay";
import { SiteHeader } from "@/components/home/site-header";
import { useCommunityPlaces } from "@/hooks/use-community-places";
import { useSavedPlaces } from "@/hooks/use-saved-places";
import type { Place } from "@/types/place";

export function HomeExperience() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { communityPlaces } = useCommunityPlaces();

  const { savedPlaceIds, toggleSavedPlace, removeSavedPlace } =
    useSavedPlaces();

  const allPlaces = useMemo(
    () => [...communityPlaces, ...basePlaces],
    [communityPlaces],
  );

  const savedPlaces = useMemo(
    () => allPlaces.filter((place) => savedPlaceIds.includes(place.id)),
    [allPlaces, savedPlaceIds],
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
        onOpenMenu={() => setMenuOpen(true)}
      />

      <PlaceShowcase
        places={allPlaces}
        searchQuery={searchQuery}
        savedPlaceIds={savedPlaceIds}
        onToggleSavedPlace={toggleSavedPlace}
        onOpenPreview={openPlacePreview}
      />

      <SearchOverlay
        places={allPlaces}
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

      <AppMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
