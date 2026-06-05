export type StoryUser = {
  id: string;
  name: string;
  avatar: string;
};

export type StoryMedia = {
  type: "image" | "video";
  url: string;
};

export type CommunityStory = {
  id: string;
  placeId: string;
  placeName: string;
  placeArea: string;
  user: StoryUser;
  media: StoryMedia;
  storyType: "experience" | "tip" | "current-vibe" | "recommendation" | "photo";
  caption: string;
  moods: string[];
  rating?: number;
  helpfulCount: number;
  createdAt: string;
};
