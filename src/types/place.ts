export type PlaceStory = {
  user: string;
  body: string;
  time: string;
};

export type OpeningHour = {
  day: string;
  hours: string;
  isToday?: boolean;
};

export type RatingBreakdown = {
  label: string;
  score: number;
};

export type MoodBreakdown = {
  label: string;
  score: number;
};

export type PracticalInfo = {
  parking: string;
  dressCode: string;
  accessibility: string;
  safetyTip: string;
  contact: string;
  website: string;
};

export type Place = {
  id: string;
  slug: string;

  name: string;
  area: string;
  address: string;
  description: string;

  categories: string[];
  moods: string[];

  rating: number;
  reviewCount: number;
  distanceKm: number;
  priceLevel: 1 | 2 | 3 | 4;

  openingStatus: "Open" | "Closed" | "Busy soon";
  closingTime: string;

  image: string;
  images: string[];

  latestStory: PlaceStory;

  openingHours: OpeningHour[];
  ratingBreakdown: RatingBreakdown[];
  moodBreakdown: MoodBreakdown[];

  practicalInfo: PracticalInfo;
  tips: string[];
};
