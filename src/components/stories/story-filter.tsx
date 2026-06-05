"use client";

import { storyFilters } from "@/data/stories";

type StoryFilterProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export function StoryFilter({
  activeFilter,
  onFilterChange,
}: StoryFilterProps) {
  return (
    <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
      {storyFilters.map((filter) => {
        const active = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`shrink-0 rounded-full px-4 py-3 text-[11px] font-semibold transition-colors ${
              active
                ? "bg-[var(--accent)] text-black"
                : "bg-[#f4f4f2] text-black/45 hover:bg-[#eaeae6] hover:text-black"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
