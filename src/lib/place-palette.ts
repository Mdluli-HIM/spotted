import type { Place } from "@/types/place";

export type PlacePalette = {
  surface: string;
  accent: string;
  accentSoft: string;
};

function containsAny(values: string[], options: string[]) {
  return options.some((option) =>
    values.some((value) => value.toLowerCase().includes(option)),
  );
}

export function getPlacePalette(place: Place): PlacePalette {
  const values = [...place.categories, ...place.moods].map((value) =>
    value.toLowerCase(),
  );

  if (containsAny(values, ["nightlife", "going out", "groups"])) {
    return {
      surface: "#F1EDF6",
      accent: "#7A649F",
      accentSoft: "#E3D9ED",
    };
  }

  if (containsAny(values, ["date", "romantic"])) {
    return {
      surface: "#F7EEE7",
      accent: "#B97B60",
      accentSoft: "#EAD7CB",
    };
  }

  if (containsAny(values, ["coffee", "study"])) {
    return {
      surface: "#EDF3EC",
      accent: "#698462",
      accentSoft: "#D5E2D1",
    };
  }

  if (containsAny(values, ["outdoors", "relaxed"])) {
    return {
      surface: "#EEF2E8",
      accent: "#788D5D",
      accentSoft: "#DDE5D2",
    };
  }

  if (containsAny(values, ["art", "culture", "creative"])) {
    return {
      surface: "#F2EDF6",
      accent: "#8B69A3",
      accentSoft: "#E2D7EB",
    };
  }

  if (containsAny(values, ["food", "dining"])) {
    return {
      surface: "#F8F1E5",
      accent: "#B88A4A",
      accentSoft: "#EEDFC6",
    };
  }

  return {
    surface: "#F2F0EA",
    accent: "#7C786F",
    accentSoft: "#E4E0D7",
  };
}
