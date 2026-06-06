import type { Place } from "@/types/place";

export type CreateCommunityPlaceInput = {
  name: string;
  area: string;
  address: string;
  description: string;
  categories: string[];
  moods: string[];
  priceLevel: 1 | 2 | 3 | 4;
  image: string;
};

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function createCommunityPlace(input: CreateCommunityPlaceInput): Place {
  const id = `community-${createSlug(input.name)}-${Date.now()}`;
  const now = new Date().toISOString();

  return {
    id,
    slug: id,
    name: input.name,
    area: input.area,
    address: input.address,
    description: input.description,
    categories: input.categories,
    moods: input.moods,
    rating: 8.0,
    reviewCount: 0,
    distanceKm: 0,
    priceLevel: input.priceLevel,
    openingStatus: "Open",
    closingTime: "Not confirmed",
    image: input.image,
    images: [input.image, input.image, input.image, input.image],
    latestStory: {
      user: "Community",
      body: "This place was recently added by the SPOTTED community.",
      time: "Just now",
    },
    openingHours: [
      { day: "Mon", hours: "Not confirmed" },
      { day: "Tue", hours: "Not confirmed" },
      { day: "Wed", hours: "Not confirmed" },
      { day: "Thu", hours: "Not confirmed" },
      { day: "Fri", hours: "Not confirmed", isToday: true },
      { day: "Sat", hours: "Not confirmed" },
      { day: "Sun", hours: "Not confirmed" },
    ],
    ratingBreakdown: [
      { label: "Atmosphere", score: 8.0 },
      { label: "Value", score: 8.0 },
      { label: "Experience", score: 8.0 },
      { label: "Community interest", score: 8.0 },
    ],
    moodBreakdown: input.moods.slice(0, 4).map((mood) => ({
      label: mood,
      score: 80,
    })),
    practicalInfo: {
      parking: "Not confirmed yet.",
      dressCode: "Not confirmed yet.",
      accessibility: "Not confirmed yet.",
      safetyTip: "Visit with care until more community details are added.",
      contact: "Not confirmed yet.",
      website: "Not confirmed yet.",
    },
    tips: [
      "Community added place.",
      "More stories will improve this listing.",
      `Added on ${now.slice(0, 10)}.`,
    ],
  };
}
