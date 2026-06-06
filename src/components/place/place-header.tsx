"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Menu } from "lucide-react";

import type { Place } from "@/types/place";
import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { ShareButton } from "@/components/sharing/share-button";
import { buildPlaceShareTarget } from "@/lib/share-links";

type PlaceHeaderProps = {
  place: Place;
  saved: boolean;
  onToggleSaved: () => void;
  onOpenMenu: () => void;
};

export function PlaceHeader({
  place,
  saved,
  onToggleSaved,
  onOpenMenu,
}: PlaceHeaderProps) {
  return (
    <header className="sticky top-0 z-40 -mx-4 flex items-center justify-between bg-white/95 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:mx-0 lg:bg-transparent lg:px-0">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]"
        >
          <ArrowLeft size={18} />
        </Link>

        <BrandWordmark compact />
      </div>

      <div className="flex items-center gap-2">
        <ShareButton
          target={buildPlaceShareTarget(place)}
          iconOnly
          className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]"
          iconSize={17}
        />

        <button
          type="button"
          onClick={onToggleSaved}
          className={`flex size-11 items-center justify-center rounded-full ${
            saved ? "bg-black text-white" : "bg-[#f4f4f2] text-black"
          }`}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>

        <button
          type="button"
          aria-label="Open menu"
          onClick={onOpenMenu}
          className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
