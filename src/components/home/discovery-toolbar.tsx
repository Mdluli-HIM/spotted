"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  MapPin,
  Navigation,
  RotateCcw,
  Search,
  SlidersHorizontal,
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

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
        setAreaQuery("");
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenFilter(null);
        setAreaQuery("");
      }
    }

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function toggleFilter(filter: Exclude<OpenFilter, null>) {
    const nextFilter = openFilter === filter ? null : filter;

    setOpenFilter(nextFilter);

    if (nextFilter !== "area") {
      setAreaQuery("");
    }
  }

  function closeFilters() {
    setOpenFilter(null);
    setAreaQuery("");
  }

  function selectMood(mood: string) {
    onMoodChange(mood);
    closeFilters();
  }

  function selectArea(area: string) {
    onAreaChange(area);
    closeFilters();
  }

  function clearFilters() {
    onMoodChange("All");
    onAreaChange("All areas");
    closeFilters();
  }

  return (
    <div
      ref={toolbarRef}
      className="relative z-30 mt-9 flex flex-wrap items-center gap-2"
    >
      {openFilter && (
        <button
          type="button"
          aria-label="Close filters"
          onClick={closeFilters}
          className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[1px] sm:hidden"
        />
      )}

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
          <SlidersHorizontal size={14} />

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
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[82dvh] w-full overflow-y-auto rounded-t-[30px] bg-[#fcfcfb] p-4 shadow-[0_-24px_70px_rgba(30,27,20,0.16)] sm:absolute sm:bottom-auto sm:left-0 sm:right-auto sm:top-[calc(100%+10px)] sm:max-h-none sm:w-[360px] sm:rounded-[26px] sm:border sm:border-black/[0.05] sm:p-3 sm:shadow-[0_24px_70px_rgba(30,27,20,0.14)]">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-black/10 sm:hidden" />

            <div className="flex items-center justify-between px-2 pb-4 pt-1">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  Choose your mood
                </p>

                <p className="mt-1 text-[12px] font-medium text-black/45">
                  What feels right today?
                </p>
              </div>

              <button
                type="button"
                onClick={closeFilters}
                className="flex size-10 items-center justify-center rounded-full bg-[#f4f4f2] sm:hidden"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {moodFilters.map((mood) => {
                const selected = activeMood === mood;

                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => selectMood(mood)}
                    className={`flex min-h-14 items-center justify-between gap-3 rounded-[18px] px-4 text-left text-[12px] font-semibold transition-colors ${
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
          <div className="fixed inset-x-0 bottom-0 z-50 max-h-[86dvh] w-full overflow-hidden rounded-t-[30px] bg-[#fcfcfb] p-4 shadow-[0_-24px_70px_rgba(30,27,20,0.16)] sm:absolute sm:bottom-auto sm:left-0 sm:right-auto sm:top-[calc(100%+10px)] sm:max-h-none sm:w-[380px] sm:rounded-[28px] sm:border sm:border-black/[0.05] sm:p-3 sm:shadow-[0_24px_70px_rgba(30,27,20,0.14)]">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-black/10 sm:hidden" />

            <div className="mb-4 flex items-center justify-between px-1 sm:hidden">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  Choose an area
                </p>

                <p className="mt-1 text-[12px] font-medium text-black/45">
                  Search or explore nearby places.
                </p>
              </div>

              <button
                type="button"
                onClick={closeFilters}
                className="flex size-10 items-center justify-center rounded-full bg-[#f4f4f2]"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-full bg-[#f4f4f2] px-4 py-3.5">
              <Search size={15} className="shrink-0 text-black/35" />

              <input
                value={areaQuery}
                onChange={(event) => setAreaQuery(event.target.value)}
                placeholder="Search an area..."
                className="w-full min-w-0 bg-transparent text-[13px] font-medium text-black outline-none placeholder:text-black/30"
              />

              {areaQuery && (
                <button
                  type="button"
                  aria-label="Clear area search"
                  onClick={() => setAreaQuery("")}
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-black"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="no-scrollbar mt-3 max-h-[62dvh] overflow-y-auto pb-2 sm:max-h-[380px]">
              {areaQuery ? (
                <div>
                  <p className="px-2 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
                    Search results
                  </p>

                  {filteredAreas.length > 0 ? (
                    <div className="space-y-2">
                      {filteredAreas.map((area) => (
                        <AreaOption
                          key={area}
                          area={area}
                          selected={activeArea === area}
                          onSelect={() => selectArea(area)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[22px] bg-[#f4f4f2] p-5">
                      <p className="text-[14px] font-semibold text-black">
                        No area found.
                      </p>

                      <p className="mt-2 text-[11px] leading-relaxed text-black/40">
                        We may not have registered places there yet.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => selectArea("All areas")}
                    className={`flex w-full items-center justify-between rounded-[20px] px-4 py-4 text-left transition-colors ${
                      activeArea === "All areas"
                        ? "bg-black text-white"
                        : "bg-[#f4f4f2] text-black hover:bg-[#eaeae6]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-white text-black">
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
                            className={`flex min-h-[82px] flex-col items-start justify-between rounded-[20px] p-4 text-left transition-colors ${
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
      className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-[18px] px-4 text-left text-[12px] font-semibold transition-colors ${
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
