export type PlaceMoodMetric = {
  label: string;
  score: number;
  note: string;
};

export type PlaceRatingMetric = {
  label: string;
  score: number;
};

export type PlaceInformationItem = {
  label: string;
  value: string;
  description?: string;
};

export type PlaceOpeningHours = {
  day: string;
  hours: string;
};

export type PlaceProfile = {
  placeId: string;
  tagline: string;
  about: string;
  images: string[];
  highlights: string[];
  moodBreakdown: PlaceMoodMetric[];
  ratingBreakdown: PlaceRatingMetric[];
  practicalInfo: PlaceInformationItem[];
  openingHours: PlaceOpeningHours[];
};
