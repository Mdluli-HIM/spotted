import { ArrowUpRight } from "lucide-react";

export function EmptyDiscoveryState() {
  return (
    <div className="mt-12 flex min-h-[430px] w-full items-center justify-center rounded-[30px] bg-[#f2f0ea] px-6 text-center">
      <div className="max-w-[430px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
          Nothing matched
        </p>

        <h2 className="mt-4 text-[42px] font-semibold leading-[0.92] tracking-[-0.07em] text-black">
          No place fits that mood yet.
        </h2>

        <p className="mt-5 text-[13px] leading-relaxed text-black/45">
          Try another area, change the mood, or be the first person to add a
          place people should know about.
        </p>

        <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 text-[12px] font-semibold text-white">
          Add a place
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
