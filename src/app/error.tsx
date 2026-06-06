"use client";

import { RotateCcw } from "lucide-react";

import { BrandWordmark } from "@/components/brand/brand-wordmark";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="min-h-dvh w-full bg-white px-4 py-4 sm:px-8 sm:py-7 lg:px-16 lg:py-9">
      <header className="flex items-center justify-between">
        <BrandWordmark />
      </header>

      <section className="flex min-h-[76dvh] items-center justify-center text-center">
        <div className="max-w-[540px]">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#f4f4f2]">
            <RotateCcw size={20} />
          </span>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
            Something went wrong
          </p>

          <h1 className="mt-4 text-[58px] font-semibold leading-[0.88] tracking-[-0.08em] text-black sm:text-[84px]">
            Let’s try that again.
          </h1>

          <p className="mx-auto mt-6 max-w-[420px] text-[14px] leading-relaxed text-black/45">
            SPOTTED could not load this experience properly.
          </p>

          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex rounded-full bg-black px-6 py-4 text-[12px] font-semibold text-white"
          >
            Reload page
          </button>
        </div>
      </section>
    </main>
  );
}
