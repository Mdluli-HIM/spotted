"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { CommunityStory } from "@/types/story";

const STORAGE_KEY = "spotted.communityStories";
const CHANGE_EVENT = "spotted:community-stories-change";

const EMPTY_STORIES: CommunityStory[] = [];

let cachedRawValue: string | null = null;
let cachedStories: CommunityStory[] = EMPTY_STORIES;

function parseStories(rawValue: string): CommunityStory[] {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return EMPTY_STORIES;
    }

    return parsedValue.filter((item): item is CommunityStory => {
      return (
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "placeId" in item &&
        "placeName" in item &&
        "caption" in item
      );
    });
  } catch {
    return EMPTY_STORIES;
  }
}

function getSnapshot(): CommunityStory[] {
  if (typeof window === "undefined") {
    return EMPTY_STORIES;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY) ?? "[]";

  if (rawValue === cachedRawValue) {
    return cachedStories;
  }

  cachedRawValue = rawValue;
  cachedStories = parseStories(rawValue);

  return cachedStories;
}

function getServerSnapshot(): CommunityStory[] {
  return EMPTY_STORIES;
}

function subscribe(onStoreChange: () => void) {
  function handleChange() {
    onStoreChange();
  }

  window.addEventListener("storage", handleChange);
  window.addEventListener(CHANGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(CHANGE_EVENT, handleChange);
  };
}

function writeStories(stories: CommunityStory[]) {
  const rawValue = JSON.stringify(stories);

  window.localStorage.setItem(STORAGE_KEY, rawValue);

  cachedRawValue = rawValue;
  cachedStories = stories;

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useCommunityStories() {
  const communityStories = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const addCommunityStory = useCallback((story: CommunityStory) => {
    const currentStories = getSnapshot();

    writeStories([story, ...currentStories]);
  }, []);

  const removeCommunityStory = useCallback((storyId: string) => {
    const currentStories = getSnapshot();

    writeStories(currentStories.filter((story) => story.id !== storyId));
  }, []);

  return {
    communityStories,
    addCommunityStory,
    removeCommunityStory,
  };
}
