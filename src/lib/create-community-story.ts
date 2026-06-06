import type { Place } from "@/types/place";
import type { CommunityStory } from "@/types/story";

export type CreateCommunityStoryInput = {
  place: Place;
  storyType: CommunityStory["storyType"];
  caption: string;
  moods: string[];
  rating: number;
  image: string;
  userName: string;
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function createCommunityStory(
  input: CreateCommunityStoryInput,
): CommunityStory {
  return {
    id: `community-story-${createSlug(input.place.name)}-${Date.now()}`,
    placeId: input.place.id,
    placeName: input.place.name,
    placeArea: input.place.area,
    user: {
      id: "local-user",
      name: input.userName,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    media: {
      type: "image",
      url: input.image,
    },
    storyType: input.storyType,
    caption: input.caption,
    moods: input.moods,
    rating: input.rating,
    helpfulCount: 0,
    createdAt: "Just now",
  };
}
