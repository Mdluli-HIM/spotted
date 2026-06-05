import type { Place } from "@/types/place";
import type { PlaceProfile } from "@/types/place-profile";

type PlaceProfileSeed = Omit<PlaceProfile, "placeId" | "images"> & {
  supportingImages: string[];
};

const sharedHours = [
  { day: "Monday – Thursday", hours: "09:00 – 22:00" },
  { day: "Friday", hours: "09:00 – 00:00" },
  { day: "Saturday", hours: "10:00 – 00:00" },
  { day: "Sunday", hours: "10:00 – 20:00" },
];

const profileSeeds: Record<string, PlaceProfileSeed> = {
  "orbit-night-market": {
    tagline: "A late-night place for music, food and groups.",
    about:
      "A lively city spot where music, conversation and food carry the evening. It becomes busier as the night continues, making it better suited to groups and people looking for energy.",
    supportingImages: [
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=1600&q=85",
    ],
    highlights: [
      "Best after 21:00",
      "Good for groups",
      "Music-led atmosphere",
      "Busy on weekends",
    ],
    moodBreakdown: [
      { label: "Energetic", score: 94, note: "Very lively after 21:00" },
      { label: "Group friendly", score: 91, note: "Better with friends" },
      {
        label: "Good music",
        score: 88,
        note: "Music is central to the experience",
      },
      { label: "Relaxed", score: 28, note: "Not ideal for quiet plans" },
    ],
    ratingBreakdown: [
      { label: "Atmosphere", score: 9.3 },
      { label: "Music", score: 9.1 },
      { label: "Crowd", score: 8.6 },
      { label: "Safety", score: 7.8 },
      { label: "Value", score: 7.6 },
    ],
    practicalInfo: [
      {
        label: "Dress expectation",
        value: "Smart casual",
        description: "Most visitors dress for a night out.",
      },
      {
        label: "Parking",
        value: "Street and paid parking",
        description: "Arrive earlier on busy nights.",
      },
      {
        label: "Safety",
        value: "Travel in groups at night",
        description: "Use trusted transport when leaving late.",
      },
      {
        label: "Best time",
        value: "Friday after 21:00",
      },
    ],
    openingHours: sharedHours,
  },

  "olive-and-oak": {
    tagline: "Soft lighting, good food and easy conversation.",
    about:
      "A warm, intimate restaurant experience that works particularly well for dates and slower evenings. The atmosphere remains calm enough to talk while still feeling special.",
    supportingImages: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=85",
    ],
    highlights: [
      "Good for first dates",
      "Better after sunset",
      "Calm atmosphere",
      "Reservation recommended",
    ],
    moodBreakdown: [
      { label: "Romantic", score: 94, note: "A strong choice for dates" },
      { label: "Relaxed", score: 86, note: "Easy conversation and soft music" },
      { label: "Good food", score: 84, note: "Frequently praised by visitors" },
      { label: "Group friendly", score: 48, note: "Better for smaller groups" },
    ],
    ratingBreakdown: [
      { label: "Atmosphere", score: 9.4 },
      { label: "Food", score: 8.9 },
      { label: "Service", score: 8.6 },
      { label: "Cleanliness", score: 9.1 },
      { label: "Value", score: 7.8 },
    ],
    practicalInfo: [
      {
        label: "Dress expectation",
        value: "Smart casual",
        description: "Relaxed, but slightly dressed-up works well.",
      },
      {
        label: "Parking",
        value: "Secure paid parking",
      },
      {
        label: "Accessibility",
        value: "Step-free entrance",
      },
      {
        label: "Best time",
        value: "After 18:30",
      },
    ],
    openingHours: sharedHours,
  },

  "common-room": {
    tagline: "Coffee, calm corners and enough space to work.",
    about:
      "A student-friendly coffee space designed for slower visits, focused work and informal conversations. It is usually quieter during weekday afternoons.",
    supportingImages: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85",
    ],
    highlights: [
      "Reliable Wi-Fi",
      "Good plug access",
      "Student-friendly prices",
      "Quiet after lunch",
    ],
    moodBreakdown: [
      { label: "Productive", score: 92, note: "Strong study environment" },
      { label: "Relaxed", score: 87, note: "Comfortable for long visits" },
      { label: "Affordable", score: 84, note: "Suitable for students" },
      { label: "Social", score: 54, note: "Better for quieter meetings" },
    ],
    ratingBreakdown: [
      { label: "Atmosphere", score: 8.8 },
      { label: "Coffee", score: 8.5 },
      { label: "Wi-Fi", score: 9.0 },
      { label: "Value", score: 8.7 },
      { label: "Noise level", score: 8.4 },
    ],
    practicalInfo: [
      {
        label: "Wi-Fi",
        value: "Free and reliable",
      },
      {
        label: "Plug points",
        value: "Available at most tables",
      },
      {
        label: "Parking",
        value: "Limited street parking",
      },
      {
        label: "Best time",
        value: "Weekdays after 14:00",
      },
    ],
    openingHours: sharedHours,
  },

  "the-wilds": {
    tagline: "A quiet outdoor reset with city views.",
    about:
      "An outdoor escape for walking, slow dates and peaceful afternoons. Visitors usually recommend arriving before sunset and travelling with company.",
    supportingImages: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",
    ],
    highlights: [
      "Best before sunset",
      "Free entrance",
      "Good walking routes",
      "Calm city views",
    ],
    moodBreakdown: [
      { label: "Peaceful", score: 96, note: "One of its strongest qualities" },
      { label: "Outdoors", score: 95, note: "Made for walking and exploring" },
      { label: "Date friendly", score: 83, note: "Popular for slow dates" },
      { label: "Night friendly", score: 18, note: "Visit during daylight" },
    ],
    ratingBreakdown: [
      { label: "Scenery", score: 9.5 },
      { label: "Atmosphere", score: 9.2 },
      { label: "Value", score: 9.8 },
      { label: "Safety", score: 7.5 },
      { label: "Accessibility", score: 7.0 },
    ],
    practicalInfo: [
      {
        label: "Entrance",
        value: "Free",
      },
      {
        label: "Safety",
        value: "Visit during daylight",
        description: "Travelling with company is recommended.",
      },
      {
        label: "Parking",
        value: "Street parking nearby",
      },
      {
        label: "Best time",
        value: "Before sunset",
      },
    ],
    openingHours: sharedHours,
  },

  "gallery-evening": {
    tagline: "Art, culture and a different way to explore the city.",
    about:
      "A creative experience suited to people who prefer moving between spaces rather than sitting in one venue. It works well for dates, friends and solo visits.",
    supportingImages: [
      "https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=1600&q=85",
    ],
    highlights: [
      "Good for creative dates",
      "Walkable experience",
      "Frequent exhibitions",
      "Interesting photo spots",
    ],
    moodBreakdown: [
      { label: "Creative", score: 96, note: "The strongest reason to visit" },
      { label: "Interesting", score: 91, note: "Always something to explore" },
      { label: "Date friendly", score: 82, note: "Good for conversation" },
      { label: "Relaxed", score: 71, note: "Depends on the event" },
    ],
    ratingBreakdown: [
      { label: "Atmosphere", score: 9.1 },
      { label: "Creativity", score: 9.6 },
      { label: "Value", score: 8.5 },
      { label: "Accessibility", score: 8.0 },
      { label: "Variety", score: 8.8 },
    ],
    practicalInfo: [
      {
        label: "Entrance",
        value: "Varies by exhibition",
      },
      {
        label: "Dress expectation",
        value: "Casual",
      },
      {
        label: "Parking",
        value: "Paid parking nearby",
      },
      {
        label: "Best time",
        value: "Weekend afternoons",
      },
    ],
    openingHours: sharedHours,
  },

  "melville-corner": {
    tagline: "Affordable food spots people quietly recommend.",
    about:
      "A collection of smaller food experiences with relaxed service, friendly prices and strong local recommendations.",
    supportingImages: [
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=85",
    ],
    highlights: [
      "Affordable meals",
      "Friendly local atmosphere",
      "Good for casual plans",
      "Multiple nearby options",
    ],
    moodBreakdown: [
      { label: "Affordable", score: 94, note: "Strong value for money" },
      { label: "Casual", score: 92, note: "Easy and unpretentious" },
      { label: "Good food", score: 88, note: "Frequently recommended" },
      { label: "Romantic", score: 42, note: "Better for relaxed plans" },
    ],
    ratingBreakdown: [
      { label: "Food", score: 8.9 },
      { label: "Value", score: 9.2 },
      { label: "Atmosphere", score: 8.3 },
      { label: "Service", score: 8.5 },
      { label: "Variety", score: 8.8 },
    ],
    practicalInfo: [
      {
        label: "Price",
        value: "Student friendly",
      },
      {
        label: "Dress expectation",
        value: "Casual",
      },
      {
        label: "Parking",
        value: "Street parking",
      },
      {
        label: "Best time",
        value: "Lunch and early evening",
      },
    ],
    openingHours: sharedHours,
  },
};

function createFallbackProfile(place: Place): PlaceProfileSeed {
  return {
    tagline: place.description,
    about: place.description,
    supportingImages: [place.image, place.image, place.image],
    highlights: place.moods.slice(0, 4),
    moodBreakdown: place.moods.slice(0, 4).map((mood, index) => ({
      label: mood,
      score: 88 - index * 7,
      note: "Based on community feedback",
    })),
    ratingBreakdown: [
      { label: "Atmosphere", score: place.rating },
      { label: "Value", score: Math.max(place.rating - 0.5, 0) },
      { label: "Experience", score: Math.max(place.rating - 0.2, 0) },
    ],
    practicalInfo: [
      { label: "Area", value: place.area },
      { label: "Address", value: place.address },
      { label: "Closing time", value: place.closingTime },
    ],
    openingHours: sharedHours,
  };
}

export function getPlaceProfile(place: Place): PlaceProfile {
  const seed = profileSeeds[place.id] ?? createFallbackProfile(place);

  return {
    placeId: place.id,
    tagline: seed.tagline,
    about: seed.about,
    images: [place.image, ...seed.supportingImages],
    highlights: seed.highlights,
    moodBreakdown: seed.moodBreakdown,
    ratingBreakdown: seed.ratingBreakdown,
    practicalInfo: seed.practicalInfo,
    openingHours: seed.openingHours,
  };
}
