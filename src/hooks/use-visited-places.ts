"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "spotted.visitedPlaces";
const CHANGE_EVENT = "spotted:visited-places-change";

const EMPTY_IDS: string[] = [];

let cachedRawValue: string | null = null;
let cachedIds: string[] = EMPTY_IDS;

function parseIds(rawValue: string): string[] {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return EMPTY_IDS;
    }

    return Array.from(
      new Set(
        parsedValue.filter(
          (value): value is string =>
            typeof value === "string" && value.length > 0,
        ),
      ),
    );
  } catch {
    return EMPTY_IDS;
  }
}

function getSnapshot(): string[] {
  if (typeof window === "undefined") {
    return EMPTY_IDS;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY) ?? "[]";

  if (rawValue === cachedRawValue) {
    return cachedIds;
  }

  cachedRawValue = rawValue;
  cachedIds = parseIds(rawValue);

  return cachedIds;
}

function getServerSnapshot(): string[] {
  return EMPTY_IDS;
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

function writeIds(ids: string[]) {
  const uniqueIds = Array.from(new Set(ids));
  const rawValue = JSON.stringify(uniqueIds);

  window.localStorage.setItem(STORAGE_KEY, rawValue);

  cachedRawValue = rawValue;
  cachedIds = uniqueIds;

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useVisitedPlaces() {
  const visitedPlaceIds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleVisitedPlace = useCallback((placeId: string) => {
    const currentIds = getSnapshot();

    const nextIds = currentIds.includes(placeId)
      ? currentIds.filter((id) => id !== placeId)
      : [...currentIds, placeId];

    writeIds(nextIds);
  }, []);

  return {
    visitedPlaceIds,
    toggleVisitedPlace,
  };
}
