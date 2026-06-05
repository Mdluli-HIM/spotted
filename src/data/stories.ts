import type { CommunityStory } from "@/types/story";

export const storyFilters = [
  "For you",
  "Nearby",
  "Going out",
  "Food",
  "Dates",
  "Study",
  "Outdoors",
  "Creative",
];

export const stories: CommunityStory[] = [
  {
    id: "story-late-night-energy",
    placeId: "orbit-night-market",
    placeName: "Late-night Energy",
    placeArea: "Braamfontein",
    user: {
      id: "lerato",
      name: "Lerato",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
    },
    storyType: "current-vibe",
    caption:
      "Go before 9PM if you do not want to wait too long. Music was good from the moment we got in.",
    moods: ["Going out", "Groups", "Music"],
    rating: 8.9,
    helpfulCount: 42,
    createdAt: "24 min ago",
  },
  {
    id: "story-cute-date",
    placeId: "olive-and-oak",
    placeName: "Cute Date Spots",
    placeArea: "Rosebank",
    user: {
      id: "amo",
      name: "Amo",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    },
    storyType: "recommendation",
    caption:
      "Soft lighting, calm tables and good food. It feels like a safe first-date place.",
    moods: ["Dates", "Food", "Relaxed"],
    rating: 9.2,
    helpfulCount: 31,
    createdAt: "1 hr ago",
  },
  {
    id: "story-study-coffee",
    placeId: "common-room",
    placeName: "Study & Coffee",
    placeArea: "Auckland Park",
    user: {
      id: "musa",
      name: "Musa",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=85",
    },
    storyType: "tip",
    caption:
      "Quiet after 2PM. Good Wi-Fi and enough plug points if you are trying to finish work.",
    moods: ["Study", "Coffee", "Calm"],
    rating: 8.6,
    helpfulCount: 18,
    createdAt: "2 hrs ago",
  },
  {
    id: "story-outdoor-escape",
    placeId: "the-wilds",
    placeName: "Outdoor Escapes",
    placeArea: "Houghton",
    user: {
      id: "thando",
      name: "Thando",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    },
    storyType: "experience",
    caption:
      "Go before sunset. It feels peaceful and the view makes the walk worth it.",
    moods: ["Outdoors", "Relaxed", "Dates"],
    rating: 9.1,
    helpfulCount: 53,
    createdAt: "3 hrs ago",
  },
  {
    id: "story-creative-corners",
    placeId: "gallery-evening",
    placeName: "Creative Corners",
    placeArea: "Maboneng",
    user: {
      id: "nandi",
      name: "Nandi",
      avatar:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=300&q=80",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85",
    },
    storyType: "photo",
    caption:
      "Good for walking around, seeing art and talking without sitting in one place the whole time.",
    moods: ["Creative", "Culture", "Dates"],
    rating: 8.8,
    helpfulCount: 27,
    createdAt: "5 hrs ago",
  },
  {
    id: "story-hidden-food",
    placeId: "melville-corner",
    placeName: "Hidden Food Finds",
    placeArea: "Melville",
    user: {
      id: "kgosi",
      name: "Kgosi",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
    },
    storyType: "experience",
    caption:
      "Affordable plates and the owner was friendly. Better than ordering the usual food again.",
    moods: ["Food", "Hidden", "Relaxed"],
    rating: 8.7,
    helpfulCount: 22,
    createdAt: "6 hrs ago",
  },
];
