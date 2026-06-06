import Link from "next/link";
import { ArrowUpRight, Heart, Menu, Search } from "lucide-react";

import { BrandWordmark } from "@/components/brand/brand-wordmark";

type SiteHeaderProps = {
  savedCount: number;
  onOpenSearch: () => void;
  onOpenSaved: () => void;
  onOpenMenu: () => void;
};

const navigationItems = [
  { label: "Discover", href: "/" },
  { label: "Stories", href: "/stories" },
  { label: "Saved", href: "/saved" },
  { label: "Visited", href: "/visited" },
];

export function SiteHeader({
  savedCount,
  onOpenSearch,
  onOpenSaved,
  onOpenMenu,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 -mx-4 flex items-center justify-between gap-4 bg-white/95 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      <div className="flex items-center gap-6">
        <BrandWordmark />

        <nav className="hidden items-center rounded-full bg-[#f4f4f2] p-1 md:flex">
          {navigationItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-full px-4 py-2 text-[12px] font-medium transition-colors ${
                index === 0
                  ? "bg-white text-black shadow-sm"
                  : "text-[#555550] hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenSearch}
          className="hidden items-center gap-3 rounded-full bg-[#f4f4f2] px-5 py-3 text-[12px] font-medium transition-colors hover:bg-[#eaeae6] sm:flex"
        >
          Search
          <Search size={14} />
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Search places"
          className="flex size-11 items-center justify-center rounded-full bg-[#f4f4f2] sm:hidden"
        >
          <Search size={17} />
        </button>

        <Link
          href="/contribute"
          className="hidden items-center gap-3 rounded-full bg-[#f4f4f2] px-5 py-3 text-[12px] font-medium transition-colors hover:bg-[#eaeae6] sm:flex"
        >
          Add a place
          <ArrowUpRight size={14} />
        </Link>

        <button
          type="button"
          aria-label="Open saved places"
          onClick={onOpenSaved}
          className="relative flex size-11 items-center justify-center rounded-full bg-[#f4f4f2]"
        >
          <Heart size={16} />

          {savedCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
              {savedCount}
            </span>
          )}
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
