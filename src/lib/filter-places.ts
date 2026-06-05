import type { Place } from "@/types/place";

type FilterPlacesInput = {
  places: Place[];
  query: string;
  mood: string;
  area: string;
};

export function filterPlaces({ places, query, mood, area }: FilterPlacesInput) {
  const cleanQuery = query.trim().toLowerCase();

  return places.filter((place) => {
    const matchesMood = mood === "All" || place.moods.includes(mood);
    const matchesArea = area === "All areas" || place.area === area;

    const searchableText = [
      place.name,
      place.area,
      place.address,
      place.description,
      ...place.categories,
      ...place.moods,
      place.latestStory.body,
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      cleanQuery.length === 0 || searchableText.includes(cleanQuery);

    return matchesMood && matchesArea && matchesQuery;
  });
}
