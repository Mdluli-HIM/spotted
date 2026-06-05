"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Menu, Share2 } from "lucide-react";
import { BrandWordmark } from "@/components/brand/brand-wordmark";

type PlaceHeaderProps = {
  saved: boolean;
  onToggleSaved: () => void;
  onShare: () => void;
};

export function PlaceHeader({
  saved,
  onToggleSaved,
  onShare,
}: PlaceHeaderProps) {
  return (
    <header className="sticky top-0 z-40 -mx-5 flex items-center justify-between bg-[#fcfcfb]/92 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:mx-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2] transition-colors hover:bg-[#eaeae6]"
        >
          <ArrowLeft size={18} />
        </Link>

        <BrandWordmark compact />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onShare}
          className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2] transition-colors hover:bg-[#eaeae6]"
        >
          <Share2 size={17} />
        </button>

        <button
          type="button"
          onClick={onToggleSaved}
          className={`flex size-11 items-center justify-center rounded-full transition-colors ${
            saved
              ? "bg-black text-white"
              : "bg-[#f4f4f2] text-black hover:bg-[#eaeae6]"
          }`}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2] transition-colors hover:bg-[#eaeae6]"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
