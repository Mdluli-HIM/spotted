import Link from "next/link";
import { MapPinOff } from "lucide-react";

import { BrandWordmark } from "@/components/brand/brand-wordmark";

export default function NotFound() {
  return (
    <main className="min-h-dvh w-full bg-white px-4 py-4 sm:px-8 sm:py-7 lg:px-16 lg:py-9">
      <header className="flex items-center justify-between">
        <BrandWordmark />

        <Link
          href="/"
          className="rounded-full bg-[#f4f4f2] px-5 py-3 text-[12px] font-semibold text-black"
        >
          Back home
        </Link>
      </header>

      <section className="flex min-h-[76dvh] items-center justify-center text-center">
        <div className="max-w-[560px]">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#f4f4f2]">
            <MapPinOff size={20} />
          </span>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
            Place not found
          </p>

          <h1 className="mt-4 text-[58px] font-semibold leading-[0.88] tracking-[-0.08em] text-black sm:text-[84px]">
            This spot is not on the map.
          </h1>

          <p className="mx-auto mt-6 max-w-[420px] text-[14px] leading-relaxed text-black/45">
            The page may have moved, or this place has not been added to SPOTTED
            yet.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-black px-6 py-4 text-[12px] font-semibold text-white"
          >
            Explore places
          </Link>
        </div>
      </section>
    </main>
  );
}
