"use client";

import { useMemo, useState } from "react";

import { places } from "@/data/places";
import { stories as baseStories } from "@/data/stories";
import { useCommunityStories } from "@/hooks/use-community-stories";
import { useSavedPlaces } from "@/hooks/use-saved-places";
import { useVisitedPlaces } from "@/hooks/use-visited-places";
import { getSimilarPlaces } from "@/lib/place-recommendations";
import type { Place } from "@/types/place";

import { AppMenu } from "@/components/navigation/app-menu";
import { ImageViewer } from "@/components/place/image-viewer";
import { MoodBreakdown } from "@/components/place/mood-breakdown";
import { PlaceGallery } from "@/components/place/place-gallery";
import { PlaceHeader } from "@/components/place/place-header";
import { PlaceHero } from "@/components/place/place-hero";
import { PlaceInformation } from "@/components/place/place-information";
import { PlaceStories } from "@/components/place/place-stories";
import { RatingBreakdown } from "@/components/place/rating-breakdown";
import { SimilarPlaces } from "@/components/place/similar-places";
import { StoryViewer } from "@/components/stories/story-viewer";

type PlaceExperienceProps = {
  place: Place;
};

export function PlaceExperience({ place }: PlaceExperienceProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [storyViewerOpen, setStoryViewerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { communityStories } = useCommunityStories();
  const { savedPlaceIds, toggleSavedPlace } = useSavedPlaces();
  const { visitedPlaceIds, toggleVisitedPlace } = useVisitedPlaces();

  const placeStories = useMemo(
    () =>
      [...communityStories, ...baseStories].filter(
        (story) => story.placeId === place.id,
      ),
    [communityStories, place.id],
  );

  const similarPlaces = useMemo(() => getSimilarPlaces(place, places), [place]);

  const activeStory = placeStories[activeStoryIndex] ?? null;

  const saved = savedPlaceIds.includes(place.id);
  const visited = visitedPlaceIds.includes(place.id);

  function selectStory(storyId: string) {
    const index = placeStories.findIndex((story) => story.id === storyId);

    if (index >= 0) {
      setActiveStoryIndex(index);
      setStoryViewerOpen(true);
    }
  }

  function nextStory() {
    setActiveStoryIndex((current) =>
      current === placeStories.length - 1 ? 0 : current + 1,
    );
  }

  function previousStory() {
    setActiveStoryIndex((current) =>
      current === 0 ? placeStories.length - 1 : current - 1,
    );
  }

  return (
    <>
      <PlaceHeader
        place={place}
        saved={saved}
        onToggleSaved={() => toggleSavedPlace(place.id)}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <PlaceHero
        place={place}
        visited={visited}
        onToggleVisited={() => toggleVisitedPlace(place.id)}
      />

      <PlaceGallery place={place} onOpenImage={setActiveImageIndex} />

      <div className="mt-20 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <MoodBreakdown place={place} />
        <RatingBreakdown place={place} />
      </div>

      <PlaceStories
        placeName={place.name}
        stories={placeStories}
        onSelectStory={selectStory}
      />

      <PlaceInformation place={place} />

      <SimilarPlaces places={similarPlaces} />

      <ImageViewer
        images={place.images}
        activeIndex={activeImageIndex}
        onClose={() => setActiveImageIndex(null)}
        onChangeIndex={setActiveImageIndex}
      />

      <StoryViewer
        open={storyViewerOpen}
        story={activeStory}
        activeIndex={activeStoryIndex}
        totalStories={placeStories.length}
        onClose={() => setStoryViewerOpen(false)}
        onNext={nextStory}
        onPrevious={previousStory}
      />

      <AppMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
