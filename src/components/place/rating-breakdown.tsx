import type { Place } from "@/types/place";

type RatingBreakdownProps = {
  place: Place;
};

export function RatingBreakdown({ place }: RatingBreakdownProps) {
  return (
    <section className="rounded-[36px] bg-[#f4f4f2] p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
        Community rating
      </p>

      <div className="mt-4 flex items-end gap-3">
        <span className="text-[72px] font-semibold leading-none tracking-[-0.08em] text-black">
          {place.rating}
        </span>

        <span className="pb-2 text-[13px] font-semibold text-black/35">
          / 10
        </span>
      </div>

      <div className="mt-8 space-y-5">
        {place.ratingBreakdown.map((rating) => (
          <div key={rating.label}>
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-black">
                {rating.label}
              </p>

              <p className="text-[12px] font-semibold text-black/45">
                {rating.score}
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-black"
                style={{ width: `${rating.score * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
