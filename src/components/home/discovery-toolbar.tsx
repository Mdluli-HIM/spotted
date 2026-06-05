"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  MapPin,
  Navigation,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import { areaFilters, moodFilters, popularAreas } from "@/data/places";

type DiscoveryToolbarProps = {
  activeMood: string;
  activeArea: string;
  onMoodChange: (mood: string) => void;
  onAreaChange: (area: string) => void;
};

type OpenFilter = "mood" | "area" | null;

export function DiscoveryToolbar({
  activeMood,
  activeArea,
  onMoodChange,
  onAreaChange,
}: DiscoveryToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [openFilter, setOpenFilter] = useState<OpenFilter>(null);
  const [areaQuery, setAreaQuery] = useState("");

  const hasActiveFilters = activeMood !== "All" || activeArea !== "All areas";

  const filteredAreas = useMemo(() => {
    const cleanQuery = areaQuery.trim().toLowerCase();

    if (!cleanQuery) {
      return [];
    }

    return areaFilters.filter((area) =>
      area.toLowerCase().includes(cleanQuery),
    );
  }, [areaQuery]);

  function toggleFilter(filter: OpenFilter) {
    setOpenFilter((current) => {
      const nextFilter = current === filter ? null : filter;

      if (nextFilter !== "area") {
        setAreaQuery("");
      }

      return nextFilter;
    });
  }

  function selectMood(mood: string) {
    onMoodChange(mood);
    setOpenFilter(null);
  }

  function selectArea(area: string) {
    onAreaChange(area);
    setAreaQuery("");
    setOpenFilter(null);
  }

  function clearFilters() {
    onMoodChange("All");
    onAreaChange("All areas");
    setAreaQuery("");
    setOpenFilter(null);
  }

  return (
    <div
      ref={toolbarRef}
      className="relative z-30 mt-9 flex flex-wrap items-center gap-2"
    >
      <div className="relative">
        <button
          type="button"
          aria-expanded={openFilter === "mood"}
          onClick={() => toggleFilter("mood")}
          className={`flex min-h-11 items-center gap-3 rounded-full px-4 text-[12px] font-semibold transition-all duration-300 ${
            activeMood !== "All"
              ? "bg-[var(--accent)] text-black"
              : "bg-[#f4f4f2] text-black hover:bg-[#eaeae6]"
          }`}
        >
          <Sparkles size={14} />

          <span>
            Mood
            {activeMood !== "All" && (
              <span className="ml-1 text-black/55">· {activeMood}</span>
            )}
          </span>

          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              openFilter === "mood" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openFilter === "mood" && (
          <div className="absolute left-0 top-[calc(100%+10px)] z-40 w-[310px] rounded-[26px] border border-black/[0.05] bg-[#fcfcfb] p-3 shadow-[0_24px_70px_rgba(30,27,20,0.14)] sm:w-[360px]">
            <p className="px-2 pb-3 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
              What are you in the mood for?
            </p>

            <div className="grid grid-cols-2 gap-2">
              {moodFilters.map((mood) => {
                const selected = activeMood === mood;

                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => selectMood(mood)}
                    className={`flex min-h-12 items-center justify-between gap-3 rounded-[17px] px-4 text-left text-[12px] font-semibold transition-colors ${
                      selected
                        ? "bg-[var(--accent)] text-black"
                        : "bg-[#f4f4f2] text-black/55 hover:bg-[#eaeae6] hover:text-black"
                    }`}
                  >
                    <span>{mood === "All" ? "Every mood" : mood}</span>

                    {selected && (
                      <span className="flex size-6 items-center justify-center rounded-full bg-black text-white">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          aria-expanded={openFilter === "area"}
          onClick={() => toggleFilter("area")}
          className={`flex min-h-11 items-center gap-3 rounded-full px-4 text-[12px] font-semibold transition-all duration-300 ${
            activeArea !== "All areas"
              ? "bg-black text-white"
              : "bg-[#f4f4f2] text-black hover:bg-[#eaeae6]"
          }`}
        >
          <MapPin size={14} />

          <span>
            Area
            {activeArea !== "All areas" && (
              <span className="ml-1 text-white/55">· {activeArea}</span>
            )}
          </span>

          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              openFilter === "area" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openFilter === "area" && (
          <div className="absolute left-0 top-[calc(100%+10px)] z-40 w-[320px] overflow-hidden rounded-[28px] border border-black/[0.05] bg-[#fcfcfb] p-3 shadow-[0_24px_70px_rgba(30,27,20,0.14)] sm:w-[380px]">
            <div className="flex items-center gap-3 rounded-full bg-[#f4f4f2] px-4 py-3">
              <Search size={15} className="shrink-0 text-black/35" />

              <input
                value={areaQuery}
                onChange={(event) => setAreaQuery(event.target.value)}
                autoFocus
                placeholder="Search an area..."
                className="w-full bg-transparent text-[12px] font-medium text-black outline-none placeholder:text-black/30"
              />

              {areaQuery && (
                <button
                  type="button"
                  aria-label="Clear area search"
                  onClick={() => setAreaQuery("")}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-black"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="no-scrollbar mt-3 max-h-[380px] overflow-y-auto">
              {areaQuery ? (
                <div>
                  <p className="px-2 pb-3 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                    Search results
                  </p>

                  {filteredAreas.length > 0 ? (
                    <div className="space-y-2">
                      {filteredAreas.map((area) => {
                        const selected = activeArea === area;

                        return (
                          <AreaOption
                            key={area}
                            area={area}
                            selected={selected}
                            onSelect={() => selectArea(area)}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-[20px] bg-[#f4f4f2] p-5">
                      <p className="text-[13px] font-semibold text-black">
                        No area found.
                      </p>

                      <p className="mt-2 text-[11px] leading-relaxed text-black/40">
                        We may not have places registered there yet.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => selectArea("All areas")}
                    className={`flex w-full items-center justify-between rounded-[19px] px-4 py-4 text-left transition-colors ${
                      activeArea === "All areas"
                        ? "bg-black text-white"
                        : "bg-[#f4f4f2] text-black hover:bg-[#eaeae6]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-9 items-center justify-center rounded-full ${
                          activeArea === "All areas"
                            ? "bg-white text-black"
                            : "bg-white text-black"
                        }`}
                      >
                        <Navigation size={14} />
                      </span>

                      <div>
                        <p className="text-[12px] font-semibold">
                          Explore everywhere
                        </p>

                        <p
                          className={`mt-1 text-[10px] ${
                            activeArea === "All areas"
                              ? "text-white/45"
                              : "text-black/35"
                          }`}
                        >
                          Show places from every area
                        </p>
                      </div>
                    </div>

                    {activeArea === "All areas" && <Check size={15} />}
                  </button>

                  <div className="mt-5">
                    <div className="flex items-center justify-between px-2 pb-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                        Popular near you
                      </p>

                      <span className="text-[10px] font-medium text-black/30">
                        Johannesburg
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {popularAreas.map((area) => {
                        const selected = activeArea === area;

                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => selectArea(area)}
                            className={`flex min-h-[74px] flex-col items-start justify-between rounded-[19px] p-4 text-left transition-colors ${
                              selected
                                ? "bg-black text-white"
                                : "bg-[#f4f4f2] text-black hover:bg-[#eaeae6]"
                            }`}
                          >
                            <MapPin size={14} />

                            <span className="text-[12px] font-semibold">
                              {area}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex min-h-11 items-center gap-2 rounded-full px-4 text-[11px] font-semibold text-black/40 transition-colors hover:bg-[#f4f4f2] hover:text-black"
        >
          <RotateCcw size={13} />
          Clear
        </button>
      )}
    </div>
  );
}

type AreaOptionProps = {
  area: string;
  selected: boolean;
  onSelect: () => void;
};

function AreaOption({ area, selected, onSelect }: AreaOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-[17px] px-4 text-left text-[12px] font-semibold transition-colors ${
        selected
          ? "bg-black text-white"
          : "bg-[#f4f4f2] text-black/55 hover:bg-[#eaeae6] hover:text-black"
      }`}
    >
      <div className="flex items-center gap-3">
        <MapPin size={13} />
        <span>{area}</span>
      </div>

      {selected && (
        <span className="flex size-6 items-center justify-center rounded-full bg-white text-black">
          <Check size={12} />
        </span>
      )}
    </button>
  );
}
