"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "spotted.savedPlaces";
const CHANGE_EVENT = "spotted:saved-places-change";

const EMPTY_SAVED_PLACE_IDS: string[] = [];

let cachedRawValue: string | null = null;
let cachedSavedPlaceIds: string[] = EMPTY_SAVED_PLACE_IDS;

function parseSavedPlaceIds(rawValue: string): string[] {
  try {
    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return EMPTY_SAVED_PLACE_IDS;
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
    return EMPTY_SAVED_PLACE_IDS;
  }
}

function getSavedPlacesSnapshot(): string[] {
  if (typeof window === "undefined") {
    return EMPTY_SAVED_PLACE_IDS;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY) ?? "[]";

  if (rawValue === cachedRawValue) {
    return cachedSavedPlaceIds;
  }

  cachedRawValue = rawValue;
  cachedSavedPlaceIds = parseSavedPlaceIds(rawValue);

  return cachedSavedPlaceIds;
}

function getSavedPlacesServerSnapshot(): string[] {
  return EMPTY_SAVED_PLACE_IDS;
}

function subscribeToSavedPlaces(onStoreChange: () => void) {
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

function writeSavedPlaceIds(nextSavedPlaceIds: string[]) {
  const uniqueSavedPlaceIds = Array.from(new Set(nextSavedPlaceIds));
  const rawValue = JSON.stringify(uniqueSavedPlaceIds);

  window.localStorage.setItem(STORAGE_KEY, rawValue);

  cachedRawValue = rawValue;
  cachedSavedPlaceIds = uniqueSavedPlaceIds;

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useSavedPlaces() {
  const savedPlaceIds = useSyncExternalStore(
    subscribeToSavedPlaces,
    getSavedPlacesSnapshot,
    getSavedPlacesServerSnapshot,
  );

  const toggleSavedPlace = useCallback((placeId: string) => {
    const currentSavedPlaceIds = getSavedPlacesSnapshot();

    const nextSavedPlaceIds = currentSavedPlaceIds.includes(placeId)
      ? currentSavedPlaceIds.filter((savedPlaceId) => savedPlaceId !== placeId)
      : [...currentSavedPlaceIds, placeId];

    writeSavedPlaceIds(nextSavedPlaceIds);
  }, []);

  const removeSavedPlace = useCallback((placeId: string) => {
    const currentSavedPlaceIds = getSavedPlacesSnapshot();

    writeSavedPlaceIds(
      currentSavedPlaceIds.filter((savedPlaceId) => savedPlaceId !== placeId),
    );
  }, []);

  return {
    savedPlaceIds,
    toggleSavedPlace,
    removeSavedPlace,
  };
}
