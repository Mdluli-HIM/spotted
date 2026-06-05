"use client";

import type { CommunityStory } from "@/types/story";
import { StoryCard } from "@/components/stories/story-card";

type PlaceStoriesProps = {
  placeName: string;
  stories: CommunityStory[];
  onSelectStory: (storyId: string) => void;
};

export function PlaceStories({
  placeName,
  stories,
  onSelectStory,
}: PlaceStoriesProps) {
  if (stories.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
        {stories.length} stories
      </p>

      <h2 className="mt-2 text-[42px] font-semibold leading-none tracking-[-0.075em] text-black">
        Stories from {placeName}.
      </h2>

      <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-black/45">
        Quick moments, honest tips and photos from people who actually went
        there.
      </p>

      <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-4">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            compact
            onClick={() => onSelectStory(story.id)}
          />
        ))}
      </div>
    </section>
  );
}
