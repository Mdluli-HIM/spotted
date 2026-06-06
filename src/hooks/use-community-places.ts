"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { Place } from "@/types/place";

const STORAGE_KEY = "spotted.communityPlaces";
const CHANGE_EVENT = "spotted:community-places-change";

const EMPTY_PLACES: Place[] = [];

let cachedRawValue: string | null = null;
let cachedPlaces: Place[] = EMPTY_PLACES;

function parsePlaces(rawValue: string): Place[] {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return EMPTY_PLACES;
    }

    return parsedValue.filter((item): item is Place => {
      return (
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "name" in item &&
        "area" in item &&
        "image" in item
      );
    });
  } catch {
    return EMPTY_PLACES;
  }
}

function getSnapshot(): Place[] {
  if (typeof window === "undefined") {
    return EMPTY_PLACES;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY) ?? "[]";

  if (rawValue === cachedRawValue) {
    return cachedPlaces;
  }

  cachedRawValue = rawValue;
  cachedPlaces = parsePlaces(rawValue);

  return cachedPlaces;
}

function getServerSnapshot(): Place[] {
  return EMPTY_PLACES;
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

function writePlaces(places: Place[]) {
  const rawValue = JSON.stringify(places);

  window.localStorage.setItem(STORAGE_KEY, rawValue);

  cachedRawValue = rawValue;
  cachedPlaces = places;

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useCommunityPlaces() {
  const communityPlaces = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const addCommunityPlace = useCallback((place: Place) => {
    const currentPlaces = getSnapshot();

    writePlaces([place, ...currentPlaces]);
  }, []);

  const removeCommunityPlace = useCallback((placeId: string) => {
    const currentPlaces = getSnapshot();

    writePlaces(currentPlaces.filter((place) => place.id !== placeId));
  }, []);

  return {
    communityPlaces,
    addCommunityPlace,
    removeCommunityPlace,
  };
}
