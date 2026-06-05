import type { Place } from "@/types/place";

export function getSimilarPlaces(currentPlace: Place, allPlaces: Place[]) {
  return allPlaces
    .filter((place) => place.id !== currentPlace.id)
    .map((place) => {
      const sharedMoods = place.moods.filter((mood) =>
        currentPlace.moods.includes(mood),
      ).length;

      const sharedCategories = place.categories.filter((category) =>
        currentPlace.categories.includes(category),
      ).length;

      const sameArea = place.area === currentPlace.area ? 1 : 0;
      const similarPrice =
        Math.abs(place.priceLevel - currentPlace.priceLevel) <= 1 ? 1 : 0;

      return {
        place,
        score: sharedMoods * 3 + sharedCategories * 4 + sameArea + similarPrice,
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.place)
    .slice(0, 5);
}
