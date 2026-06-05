"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, Search } from "lucide-react";
import { BrandWordmark } from "@/components/brand/brand-wordmark";

import { stories } from "@/data/stories";
import { StoryCollection } from "@/components/stories/story-collection";
import { StoryFilter } from "@/components/stories/story-filter";
import { StoryShowcase } from "@/components/stories/story-showcase";
import { StoryViewer } from "@/components/stories/story-viewer";

export function StoriesExperience() {
  const [activeFilter, setActiveFilter] = useState("For you");
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  const visibleStories = useMemo(() => {
    if (activeFilter === "For you" || activeFilter === "Nearby") {
      return stories;
    }

    return stories.filter((story) =>
      story.moods.some(
        (mood) => mood.toLowerCase() === activeFilter.toLowerCase(),
      ),
    );
  }, [activeFilter]);

  const safeStories = visibleStories.length > 0 ? visibleStories : stories;
  const activeStory = safeStories[activeIndex] ?? safeStories[0];

  function changeFilter(filter: string) {
    setActiveFilter(filter);
    setActiveIndex(0);
  }

  function selectStory(storyId: string) {
    const index = safeStories.findIndex((story) => story.id === storyId);

    if (index >= 0) {
      setActiveIndex(index);
      setViewerOpen(true);
    }
  }

  function nextStory() {
    setActiveIndex((current) =>
      current === safeStories.length - 1 ? 0 : current + 1,
    );
  }

  function previousStory() {
    setActiveIndex((current) =>
      current === 0 ? safeStories.length - 1 : current - 1,
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 -mx-5 flex items-center justify-between bg-[#fcfcfb]/92 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <div className="flex items-center gap-4">
          <BrandWordmark />

          <nav className="hidden items-center rounded-full bg-[#f4f4f2] p-1 md:flex">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-[12px] font-medium text-[#555550] hover:text-black"
            >
              Discover
            </Link>

            <Link
              href="/stories"
              className="rounded-full bg-white px-4 py-2 text-[12px] font-medium text-black shadow-sm"
            >
              Stories
            </Link>

            <Link
              href="/"
              className="rounded-full px-4 py-2 text-[12px] font-medium text-[#555550] hover:text-black"
            >
              Lists
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-full bg-[#f4f4f2] px-5 py-3 text-[12px] font-semibold text-black sm:flex">
            Create story
            <ArrowUpRight size={14} className="ml-2" />
          </button>

          <button className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]">
            <Search size={17} />
          </button>

          <button className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]">
            <Menu size={18} />
          </button>
        </div>
      </header>

      <main className="pt-16 md:pt-24">
        <div className="mx-auto max-w-[850px] text-center">
          <p className="mx-auto inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
            Community stories
          </p>

          <h1 className="mt-7 text-[48px] font-semibold leading-[0.94] tracking-[-0.075em] text-black sm:text-[68px] md:text-[86px]">
            Places told by the people who were there.
          </h1>

          <p className="mx-auto mt-6 max-w-[540px] text-[14px] leading-relaxed text-black/45">
            Real moments, honest tips and quick stories from restaurants, clubs,
            cafés and hidden places around you.
          </p>

          <StoryFilter
            activeFilter={activeFilter}
            onFilterChange={changeFilter}
          />
        </div>

        <StoryShowcase
          stories={safeStories}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          onOpenViewer={() => setViewerOpen(true)}
        />

        <StoryCollection
          title="Trending around campus"
          description="Stories students are saving, sharing and using before they decide where to go."
          stories={stories}
          onSelectStory={selectStory}
        />

        <StoryCollection
          title="Good places for the weekend"
          description="Quick visual recommendations for food, music, dates and slow afternoons."
          stories={[...stories].reverse()}
          onSelectStory={selectStory}
        />
      </main>

      <StoryViewer
        open={viewerOpen}
        story={activeStory}
        activeIndex={activeIndex}
        totalStories={safeStories.length}
        onClose={() => setViewerOpen(false)}
        onNext={nextStory}
        onPrevious={previousStory}
      />
    </>
  );
}
