"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { CommunityStory } from "@/types/story";
import { StoryCard } from "@/components/stories/story-card";

type StoryShowcaseProps = {
  stories: CommunityStory[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onOpenViewer: () => void;
};

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

export function StoryShowcase({
  stories,
  activeIndex,
  onActiveIndexChange,
  onOpenViewer,
}: StoryShowcaseProps) {
  const draggedRef = useRef(false);

  const activeStory = stories[activeIndex];

  function previousStory() {
    onActiveIndexChange(
      activeIndex === 0 ? stories.length - 1 : activeIndex - 1,
    );
  }

  function nextStory() {
    onActiveIndexChange(
      activeIndex === stories.length - 1 ? 0 : activeIndex + 1,
    );
  }

  function handleOpenViewer() {
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }

    onOpenViewer();
  }

  const leftStories = stories
    .filter((_, index) => index < activeIndex)
    .slice(-2);

  const rightStories = stories
    .filter((_, index) => index > activeIndex)
    .slice(0, 2);

  return (
    <section className="relative mt-12 overflow-hidden py-4 md:mt-16 md:min-h-[670px]">
      <div className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 items-center justify-between md:flex">
        <div className="flex -translate-x-8 gap-5 opacity-75">
          {leftStories.map((story, index) => (
            <div key={story.id} className={index === 0 ? "mt-20" : ""}>
              <StoryCard
                story={story}
                onClick={() =>
                  onActiveIndexChange(
                    stories.findIndex((item) => item.id === story.id),
                  )
                }
              />
            </div>
          ))}
        </div>

        <div className="flex translate-x-8 gap-5 opacity-75">
          {rightStories.map((story, index) => (
            <div key={story.id} className={index === 1 ? "mt-20" : ""}>
              <StoryCard
                story={story}
                onClick={() =>
                  onActiveIndexChange(
                    stories.findIndex((item) => item.id === story.id),
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-full overflow-hidden py-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStory.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              initial={{ opacity: 0, scale: 0.96, x: 25 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -25 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              onDragStart={() => {
                draggedRef.current = true;
              }}
              onDragEnd={(_, info) => {
                const swipedLeft =
                  info.offset.x < -SWIPE_DISTANCE ||
                  info.velocity.x < -SWIPE_VELOCITY;

                const swipedRight =
                  info.offset.x > SWIPE_DISTANCE ||
                  info.velocity.x > SWIPE_VELOCITY;

                if (swipedLeft) {
                  nextStory();
                } else if (swipedRight) {
                  previousStory();
                }

                window.setTimeout(() => {
                  draggedRef.current = false;
                }, 120);
              }}
              className="mx-auto w-fit cursor-grab touch-pan-y active:cursor-grabbing"
            >
              <StoryCard
                story={activeStory}
                active
                onClick={handleOpenViewer}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous story"
            onClick={previousStory}
            className="flex size-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 hover:scale-105"
          >
            <ArrowLeft size={15} />
          </button>

          <button
            type="button"
            aria-label="Next story"
            onClick={nextStory}
            className="flex size-10 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 hover:scale-105"
          >
            <ArrowRight size={15} />
          </button>
        </div>

        <p className="mt-3 text-[10px] font-medium text-black/30">
          Swipe to explore stories
        </p>
      </div>
    </section>
  );
}
