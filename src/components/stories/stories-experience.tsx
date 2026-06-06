"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Menu, Search } from "lucide-react";

import { stories as baseStories } from "@/data/stories";
import { useCommunityStories } from "@/hooks/use-community-stories";

import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { StoryCollection } from "@/components/stories/story-collection";
import { StoryFilter } from "@/components/stories/story-filter";
import { StoryShowcase } from "@/components/stories/story-showcase";
import { StoryViewer } from "@/components/stories/story-viewer";
import { AppMenu } from "@/components/navigation/app-menu";

export function StoriesExperience() {
  const searchParams = useSearchParams();
  const highlightedStoryId = searchParams.get("story");

  const { communityStories } = useCommunityStories();

  const allStories = useMemo(
    () => [...communityStories, ...baseStories],
    [communityStories],
  );

  const [activeFilter, setActiveFilter] = useState("For you");
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(Boolean(highlightedStoryId));
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleStories = useMemo(() => {
    if (activeFilter === "For you" || activeFilter === "Nearby") {
      return allStories;
    }

    return allStories.filter((story) =>
      story.moods.some(
        (mood) => mood.toLowerCase() === activeFilter.toLowerCase(),
      ),
    );
  }, [activeFilter, allStories]);

  const safeStories = visibleStories.length > 0 ? visibleStories : allStories;

  const resolvedStoryId =
    selectedStoryId ?? highlightedStoryId ?? safeStories[0]?.id ?? "";

  const resolvedIndex = safeStories.findIndex(
    (story) => story.id === resolvedStoryId,
  );

  const activeIndex = resolvedIndex >= 0 ? resolvedIndex : 0;
  const activeStory = safeStories[activeIndex] ?? safeStories[0] ?? null;

  function changeFilter(filter: string) {
    setActiveFilter(filter);
    setSelectedStoryId(null);
  }

  function changeActiveIndex(index: number) {
    const story = safeStories[index];

    if (story) {
      setSelectedStoryId(story.id);
    }
  }

  function selectStory(storyId: string) {
    setSelectedStoryId(storyId);
    setViewerOpen(true);
  }

  function nextStory() {
    const nextIndex =
      activeIndex === safeStories.length - 1 ? 0 : activeIndex + 1;

    changeActiveIndex(nextIndex);
  }

  function previousStory() {
    const previousIndex =
      activeIndex === 0 ? safeStories.length - 1 : activeIndex - 1;

    changeActiveIndex(previousIndex);
  }

  return (
    <>
      <header className="sticky top-0 z-40 -mx-4 flex items-center justify-between bg-white/95 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
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
              href="/saved"
              className="rounded-full px-4 py-2 text-[12px] font-medium text-[#555550] hover:text-black"
            >
              Saved
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contribute/story"
            className="hidden rounded-full bg-[#f4f4f2] px-5 py-3 text-[12px] font-semibold text-black sm:flex"
          >
            Create story
            <ArrowUpRight size={14} className="ml-2" />
          </Link>

          <button className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]">
            <Search size={17} />
          </button>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]"
          >
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
          onActiveIndexChange={changeActiveIndex}
          onOpenViewer={() => setViewerOpen(true)}
        />

        <StoryCollection
          title="Trending around campus"
          description="Stories students are saving, sharing and using before they decide where to go."
          stories={allStories}
          onSelectStory={selectStory}
        />

        <StoryCollection
          title="Good places for the weekend"
          description="Quick visual recommendations for food, music, dates and slow afternoons."
          stories={[...allStories].reverse()}
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

      <AppMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
