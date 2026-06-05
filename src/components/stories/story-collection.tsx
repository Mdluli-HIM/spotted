"use client";

import type { CommunityStory } from "@/types/story";
import { StoryCard } from "@/components/stories/story-card";

type StoryCollectionProps = {
  title: string;
  description: string;
  stories: CommunityStory[];
  onSelectStory: (storyId: string) => void;
};

export function StoryCollection({
  title,
  description,
  stories,
  onSelectStory,
}: StoryCollectionProps) {
  return (
    <section className="mt-16">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
        {stories.length} stories
      </p>

      <h2 className="mt-2 text-[34px] font-semibold leading-none tracking-[-0.07em] text-black">
        {title}
      </h2>

      <p className="mt-3 max-w-[470px] text-[13px] leading-relaxed text-black/45">
        {description}
      </p>

      <div className="no-scrollbar mt-7 flex gap-4 overflow-x-auto pb-4">
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
