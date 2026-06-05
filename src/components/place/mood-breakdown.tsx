import type { Place } from "@/types/place";
import { getPlacePalette } from "@/lib/place-palette";

type MoodBreakdownProps = {
  place: Place;
};

export function MoodBreakdown({ place }: MoodBreakdownProps) {
  const palette = getPlacePalette(place);

  return (
    <section
      className="rounded-[36px] p-6"
      style={{ backgroundColor: palette.surface }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
        What it feels like
      </p>

      <h2 className="mt-3 text-[40px] font-semibold leading-[0.94] tracking-[-0.07em] text-black">
        The mood people keep mentioning.
      </h2>

      <div className="mt-8 space-y-5">
        {place.moodBreakdown.map((mood) => (
          <div key={mood.label}>
            <div className="flex items-center justify-between gap-4">
              <p className="text-[13px] font-semibold text-black">
                {mood.label}
              </p>

              <p className="text-[12px] font-semibold text-black/45">
                {mood.score}%
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/70">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${mood.score}%`,
                  backgroundColor: palette.accent,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {place.tips.map((tip) => (
          <span
            key={tip}
            className="rounded-full bg-white/70 px-4 py-3 text-[11px] font-semibold text-black/55"
          >
            {tip}
          </span>
        ))}
      </div>
    </section>
  );
}
