import type { Place } from "@/types/place";
import type { CommunityStory } from "@/types/story";
import { siteConfig } from "@/lib/site";

export type ShareTarget = {
  kind: "place" | "story" | "app";
  id?: string;
  title: string;
  text: string;
  path: string;
};

export type ShareChannel = "copy" | "whatsapp" | "native";

export function buildPlaceShareTarget(place: Place): ShareTarget {
  return {
    kind: "place",
    id: place.id,
    title: `${place.name} — SPOTTED`,
    text: `${place.description} Found on SPOTTED.`,
    path: `/places/${place.id}`,
  };
}

export function buildStoryShareTarget(story: CommunityStory): ShareTarget {
  return {
    kind: "story",
    id: story.id,
    title: `${story.placeName} story — SPOTTED`,
    text: `${story.user.name} shared: “${story.caption}”`,
    path: `/stories?story=${encodeURIComponent(story.id)}`,
  };
}

export function buildAppShareTarget(): ShareTarget {
  return {
    kind: "app",
    title: "SPOTTED",
    text: "Discover places through people who have actually been there.",
    path: "/",
  };
}

export function getAbsoluteShareUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (typeof window !== "undefined") {
    return new URL(path, window.location.origin).toString();
  }

  return new URL(path, siteConfig.url).toString();
}

export function getWhatsAppShareUrl(target: ShareTarget) {
  const url = getAbsoluteShareUrl(target.path);
  const message = `${target.text}\n\n${url}`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function recordShareEvent(target: ShareTarget, channel: ShareChannel) {
  if (typeof window === "undefined") return;

  const storageKey = "spotted.shareEvents";

  try {
    const existingValue = window.localStorage.getItem(storageKey);
    const parsedValue: unknown = existingValue ? JSON.parse(existingValue) : [];

    const existingEvents = Array.isArray(parsedValue) ? parsedValue : [];

    const nextEvents = [
      ...existingEvents,
      {
        targetKind: target.kind,
        targetId: target.id,
        channel,
        sharedAt: new Date().toISOString(),
      },
    ].slice(-100);

    window.localStorage.setItem(storageKey, JSON.stringify(nextEvents));
  } catch {
    window.localStorage.removeItem(storageKey);
  }
}
