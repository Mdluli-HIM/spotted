"use client";

import Link from "next/link";

import { places } from "@/data/places";
import { useCommunityPlaces } from "@/hooks/use-community-places";
import { PlaceExperience } from "@/components/place/place-experience";

type PlacePageResolverProps = {
  placeId: string;
};

export function PlacePageResolver({ placeId }: PlacePageResolverProps) {
  const { communityPlaces } = useCommunityPlaces();

  const place =
    [...places, ...communityPlaces].find((item) => item.id === placeId) ?? null;

  if (!place) {
    return (
      <div className="flex min-h-[70dvh] items-center justify-center text-center">
        <div className="max-w-[420px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
            Place not found
          </p>

          <h1 className="mt-4 text-[44px] font-semibold leading-[0.9] tracking-[-0.075em] text-black">
            This place is not available on this device.
          </h1>

          <p className="mt-5 text-[13px] leading-relaxed text-black/45">
            Community-added places are saved locally until the API is added.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-black px-5 py-4 text-[12px] font-semibold text-white"
          >
            Back to discover
          </Link>
        </div>
      </div>
    );
  }

  return <PlaceExperience place={place} />;
}
