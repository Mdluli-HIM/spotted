"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ImageIcon,
  MessageCircle,
  Plus,
  Search,
} from "lucide-react";

import { places as basePlaces } from "@/data/places";
import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { StoryCard } from "@/components/stories/story-card";
import { useCommunityPlaces } from "@/hooks/use-community-places";
import { useCommunityStories } from "@/hooks/use-community-stories";
import { createCommunityStory } from "@/lib/create-community-story";
import type { CommunityStory } from "@/types/story";

const storyTypes: {
  label: string;
  value: CommunityStory["storyType"];
}[] = [
  { label: "Experience", value: "experience" },
  { label: "Useful tip", value: "tip" },
  { label: "Current vibe", value: "current-vibe" },
  { label: "Recommendation", value: "recommendation" },
  { label: "Photo story", value: "photo" },
];

const moodOptions = [
  "Good food",
  "Going out",
  "Cute date",
  "Study",
  "Relaxed",
  "Outdoors",
  "Creative",
  "Groups",
  "Music",
  "Calm",
];

const imageOptions = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85",
];

function toggleArrayValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function CreateStoryExperience() {
  const router = useRouter();

  const { communityPlaces } = useCommunityPlaces();
  const { addCommunityStory } = useCommunityStories();

  const allPlaces = useMemo(
    () => [...communityPlaces, ...basePlaces],
    [communityPlaces],
  );

  const [placeId, setPlaceId] = useState(allPlaces[0]?.id ?? "");
  const [placeQuery, setPlaceQuery] = useState("");
  const [storyType, setStoryType] =
    useState<CommunityStory["storyType"]>("experience");
  const [caption, setCaption] = useState("");
  const [moods, setMoods] = useState<string[]>(["Good food"]);
  const [rating, setRating] = useState(8.5);
  const [image, setImage] = useState(imageOptions[0]);
  const [userName, setUserName] = useState("Marcus");
  const [submittedError, setSubmittedError] = useState("");

  const selectedPlace =
    allPlaces.find((place) => place.id === placeId) ?? allPlaces[0];

  const filteredPlaces = useMemo(() => {
    const cleanQuery = placeQuery.trim().toLowerCase();

    if (!cleanQuery) {
      return allPlaces;
    }

    return allPlaces.filter((place) => {
      const searchableText = [
        place.name,
        place.area,
        place.description,
        ...place.categories,
        ...place.moods,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(cleanQuery);
    });
  }, [allPlaces, placeQuery]);

  const previewStory = selectedPlace
    ? createCommunityStory({
        place: selectedPlace,
        storyType,
        caption:
          caption.trim() || "A quick story from this place will appear here.",
        moods,
        rating,
        image,
        userName: userName.trim() || "Community",
      })
    : null;

  function publishStory() {
    setSubmittedError("");

    if (!selectedPlace) {
      setSubmittedError("Select a place before publishing.");
      return;
    }

    if (caption.trim().length < 15) {
      setSubmittedError("Write a story caption of at least 15 characters.");
      return;
    }

    if (moods.length === 0) {
      setSubmittedError("Choose at least one mood.");
      return;
    }

    if (userName.trim().length < 2) {
      setSubmittedError("Add your display name.");
      return;
    }

    const newStory = createCommunityStory({
      place: selectedPlace,
      storyType,
      caption: caption.trim(),
      moods,
      rating,
      image,
      userName: userName.trim(),
    });

    addCommunityStory(newStory);
    router.push(`/stories?story=${newStory.id}`);
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <BrandWordmark />

        <Link
          href="/contribute"
          className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]"
        >
          <ArrowLeft size={18} />
        </Link>
      </header>

      <main className="grid gap-10 pb-20 pt-14 lg:grid-cols-[0.95fr_0.6fr] lg:pt-20">
        <section>
          <p className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
            Create story
          </p>

          <h1 className="mt-7 max-w-[760px] text-[54px] font-semibold leading-[0.9] tracking-[-0.075em] text-black sm:text-[78px]">
            Share what the place actually felt like.
          </h1>

          <p className="mt-6 max-w-[540px] text-[14px] leading-relaxed text-black/45">
            Keep it short, useful and visual. People should understand the mood
            of the place before they decide to go.
          </p>

          <div className="mt-10 space-y-5">
            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                Your display name
              </label>

              <input
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                placeholder="Your name"
                className="mt-3 w-full bg-transparent text-[24px] font-semibold leading-none tracking-[-0.05em] text-black outline-none placeholder:text-black/18"
              />
            </div>

            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                Choose the place
              </label>

              <div className="mt-4 flex items-center gap-3 rounded-full bg-white px-4 py-3">
                <Search size={15} className="text-black/35" />

                <input
                  value={placeQuery}
                  onChange={(event) => setPlaceQuery(event.target.value)}
                  placeholder="Search places..."
                  className="w-full bg-transparent text-[13px] font-medium text-black outline-none placeholder:text-black/30"
                />
              </div>

              <div className="no-scrollbar mt-4 max-h-[270px] space-y-2 overflow-y-auto">
                {filteredPlaces.map((place) => {
                  const selected = place.id === selectedPlace?.id;

                  return (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => setPlaceId(place.id)}
                      className={`flex w-full items-center gap-3 rounded-[20px] p-3 text-left transition-colors ${
                        selected ? "bg-black text-white" : "bg-white text-black"
                      }`}
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-[16px]">
                        <Image
                          src={place.image}
                          alt={place.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold">
                          {place.name}
                        </p>

                        <p
                          className={`mt-1 text-[11px] ${
                            selected ? "text-white/45" : "text-black/35"
                          }`}
                        >
                          {place.area}
                        </p>
                      </div>

                      {selected && <Check size={15} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                Story type
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {storyTypes.map((type) => {
                  const selected = storyType === type.value;

                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setStoryType(type.value)}
                      className={`rounded-full px-4 py-3 text-[11px] font-semibold transition-colors ${
                        selected
                          ? "bg-[var(--accent)] text-black"
                          : "bg-white text-black/45"
                      }`}
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                Story caption
              </label>

              <textarea
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                placeholder="Example: Go before 9PM if you want to avoid the queue."
                rows={4}
                maxLength={180}
                className="mt-3 w-full resize-none bg-transparent text-[18px] font-medium leading-relaxed text-black outline-none placeholder:text-black/20"
              />

              <p className="mt-2 text-right text-[10px] font-medium text-black/30">
                {caption.length}/180
              </p>
            </div>

            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                Rating
              </p>

              <div className="mt-4 flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={rating}
                  onChange={(event) => setRating(Number(event.target.value))}
                  className="w-full accent-black"
                />

                <span className="min-w-12 rounded-full bg-black px-3 py-2 text-center text-[12px] font-semibold text-white">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>

            <ChipSection
              title="Story moods"
              options={moodOptions}
              selectedValues={moods}
              onToggle={(value) =>
                setMoods((current) => toggleArrayValue(current, value))
              }
            />

            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                <ImageIcon size={14} />
                Choose story image
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {imageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setImage(option)}
                    className={`relative h-32 overflow-hidden rounded-[20px] ${
                      image === option ? "ring-2 ring-black" : ""
                    }`}
                  >
                    <Image
                      src={option}
                      alt="Story option"
                      fill
                      sizes="180px"
                      className="object-cover"
                    />

                    {image === option && (
                      <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black text-white">
                        <Check size={13} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {submittedError && (
              <p className="rounded-full bg-[#f7ece7] px-5 py-3 text-[12px] font-semibold text-[#9c4b36]">
                {submittedError}
              </p>
            )}

            <button
              type="button"
              onClick={publishStory}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-5 py-4 text-[13px] font-semibold text-white"
            >
              Publish story
              <Plus size={15} />
            </button>
          </div>
        </section>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
            Story preview
          </p>

          <div className="flex justify-center rounded-[34px] bg-[#f4f4f2] p-5">
            {previewStory ? (
              <StoryCard story={previewStory} active />
            ) : (
              <div className="flex h-[520px] w-[315px] items-center justify-center rounded-[34px] bg-black text-center text-white">
                <div className="max-w-[220px]">
                  <MessageCircle size={22} className="mx-auto" />

                  <p className="mt-4 text-[13px] text-white/60">
                    Select a place to preview your story.
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>
      </main>
    </>
  );
}

type ChipSectionProps = {
  title: string;
  options: string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
};

function ChipSection({
  title,
  options,
  selectedValues,
  onToggle,
}: ChipSectionProps) {
  return (
    <div className="rounded-[30px] bg-[#f4f4f2] p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
        {title}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = selectedValues.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full px-4 py-3 text-[11px] font-semibold transition-colors ${
                selected
                  ? "bg-[var(--accent)] text-black"
                  : "bg-white text-black/45"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
