"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ImageIcon, MapPin, Plus } from "lucide-react";

import { areaFilters, places } from "@/data/places";
import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { useCommunityPlaces } from "@/hooks/use-community-places";
import { createCommunityPlace } from "@/lib/create-community-place";
import type { Place } from "@/types/place";

const categoryOptions = [
  "Food",
  "Dining",
  "Nightlife",
  "Groups",
  "Coffee",
  "Study",
  "Outdoors",
  "Art",
  "Culture",
];

const moodOptions = [
  "Good food",
  "Going out",
  "Cute date",
  "Study",
  "Relaxed",
  "Outdoors",
  "Creative",
];

const imageOptions = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
];

function toggleArrayValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function AddPlaceExperience() {
  const router = useRouter();
  const { communityPlaces, addCommunityPlace } = useCommunityPlaces();

  const [name, setName] = useState("");
  const [area, setArea] = useState("Braamfontein");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>(["Food"]);
  const [moods, setMoods] = useState<string[]>(["Good food"]);
  const [priceLevel, setPriceLevel] = useState<1 | 2 | 3 | 4>(2);
  const [image, setImage] = useState(imageOptions[0]);
  const [submittedError, setSubmittedError] = useState("");

  const possibleDuplicates = useMemo(() => {
    const cleanName = name.trim().toLowerCase();

    if (cleanName.length < 3) {
      return [];
    }

    return [...places, ...communityPlaces].filter((place) => {
      return (
        place.name.toLowerCase().includes(cleanName) ||
        cleanName.includes(place.name.toLowerCase())
      );
    });
  }, [communityPlaces, name]);

  const previewPlace: Place = useMemo(
    () =>
      createCommunityPlace({
        name: name.trim() || "New community place",
        area,
        address: address.trim() || "Address not confirmed",
        description:
          description.trim() ||
          "A community-added place waiting for more stories.",
        categories,
        moods,
        priceLevel,
        image,
      }),
    [address, area, categories, description, image, moods, name, priceLevel],
  );

  function publishPlace() {
    setSubmittedError("");

    if (name.trim().length < 3) {
      setSubmittedError("Add a place name before publishing.");
      return;
    }

    if (address.trim().length < 5) {
      setSubmittedError("Add a clearer address before publishing.");
      return;
    }

    if (description.trim().length < 20) {
      setSubmittedError("Write a short description of at least 20 characters.");
      return;
    }

    if (categories.length === 0 || moods.length === 0) {
      setSubmittedError("Choose at least one category and one mood.");
      return;
    }

    const newPlace = createCommunityPlace({
      name: name.trim(),
      area,
      address: address.trim(),
      description: description.trim(),
      categories,
      moods,
      priceLevel,
      image,
    });

    addCommunityPlace(newPlace);
    router.push(`/places/${newPlace.id}`);
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

      <main className="grid gap-10 pb-20 pt-14 lg:grid-cols-[0.9fr_0.7fr] lg:pt-20">
        <section>
          <p className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
            Add a place
          </p>

          <h1 className="mt-7 max-w-[720px] text-[54px] font-semibold leading-[0.9] tracking-[-0.075em] text-black sm:text-[78px]">
            Register somewhere people should know about.
          </h1>

          <p className="mt-6 max-w-[520px] text-[14px] leading-relaxed text-black/45">
            Start with the basic details. The community can improve the place
            with stories, ratings and photos later.
          </p>

          <div className="mt-10 space-y-5">
            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                Place name
              </label>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Example: The Green Room"
                className="mt-3 w-full bg-transparent text-[30px] font-semibold leading-none tracking-[-0.06em] text-black outline-none placeholder:text-black/18"
              />

              {possibleDuplicates.length > 0 && (
                <div className="mt-5 rounded-[22px] bg-white p-4">
                  <p className="text-[11px] font-semibold text-black">
                    Possible duplicates
                  </p>

                  <div className="mt-3 space-y-2">
                    {possibleDuplicates.slice(0, 3).map((place) => (
                      <Link
                        key={place.id}
                        href={`/places/${place.id}`}
                        className="flex items-center justify-between rounded-[16px] bg-[#f4f4f2] px-4 py-3 text-[12px] font-semibold text-black"
                      >
                        {place.name}
                        <span className="text-black/35">{place.area}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] bg-[#f4f4f2] p-5">
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  Area
                </label>

                <select
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  className="mt-3 w-full bg-transparent text-[18px] font-semibold text-black outline-none"
                >
                  {areaFilters
                    .filter((item) => item !== "All areas")
                    .map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                </select>
              </div>

              <div className="rounded-[26px] bg-[#f4f4f2] p-5">
                <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  Price
                </label>

                <div className="mt-3 flex gap-2">
                  {[1, 2, 3, 4].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setPriceLevel(level as 1 | 2 | 3 | 4)}
                      className={`flex size-11 items-center justify-center rounded-full text-[12px] font-semibold ${
                        priceLevel === level
                          ? "bg-black text-white"
                          : "bg-white text-black/45"
                      }`}
                    >
                      {"R".repeat(level)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                Address
              </label>

              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Street, area or landmark"
                className="mt-3 w-full bg-transparent text-[16px] font-semibold text-black outline-none placeholder:text-black/20"
              />
            </div>

            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                Short description
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="What should people know about this place?"
                rows={4}
                className="mt-3 w-full resize-none bg-transparent text-[16px] font-medium leading-relaxed text-black outline-none placeholder:text-black/20"
              />
            </div>

            <ChipSection
              title="Categories"
              options={categoryOptions}
              selectedValues={categories}
              onToggle={(value) =>
                setCategories((current) => toggleArrayValue(current, value))
              }
            />

            <ChipSection
              title="Moods"
              options={moodOptions}
              selectedValues={moods}
              onToggle={(value) =>
                setMoods((current) => toggleArrayValue(current, value))
              }
            />

            <div className="rounded-[30px] bg-[#f4f4f2] p-5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/30">
                <ImageIcon size={14} />
                Choose a photo
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {imageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setImage(option)}
                    className={`relative h-28 overflow-hidden rounded-[20px] ${
                      image === option ? "ring-2 ring-black" : ""
                    }`}
                  >
                    <Image
                      src={option}
                      alt="Place option"
                      fill
                      sizes="160px"
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
              onClick={publishPlace}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-black px-5 py-4 text-[13px] font-semibold text-white"
            >
              Publish community place
              <Plus size={15} />
            </button>
          </div>
        </section>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
            Live preview
          </p>

          <div className="overflow-hidden rounded-[34px] bg-[#f4f4f2]">
            <div className="relative h-[390px]">
              <Image
                src={previewPlace.image}
                alt={previewPlace.name}
                fill
                sizes="420px"
                className="object-cover"
              />

              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[10px] font-semibold text-black">
                Community added
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/35">
                <MapPin size={11} />
                {previewPlace.area}
              </div>

              <h2 className="mt-3 text-[40px] font-semibold leading-[0.9] tracking-[-0.075em] text-black">
                {previewPlace.name}
              </h2>

              <p className="mt-4 text-[13px] leading-relaxed text-black/45">
                {previewPlace.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[...previewPlace.categories, ...previewPlace.moods]
                  .slice(0, 5)
                  .map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-2 text-[10px] font-semibold text-black/50"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </div>
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
