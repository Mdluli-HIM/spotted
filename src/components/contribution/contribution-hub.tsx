import Link from "next/link";
import { ArrowUpRight, Camera, MapPin, MessageCircle } from "lucide-react";

import { BrandWordmark } from "@/components/brand/brand-wordmark";

const contributionOptions = [
  {
    title: "Add a new place",
    description:
      "Register a restaurant, café, club, study spot or hidden place people should know about.",
    href: "/contribute/place",
    icon: MapPin,
  },
  {
    title: "Share a story",
    description:
      "Post a short visual story about a place you visited and help others know what it feels like.",
    href: "/contribute/story",
    icon: MessageCircle,
  },
  {
    title: "Add photos",
    description:
      "Help people see what a place actually looks like. Coming soon.",
    href: "/contribute",
    icon: Camera,
  },
];

export function ContributionHub() {
  return (
    <>
      <header className="flex items-center justify-between">
        <BrandWordmark />

        <Link
          href="/"
          className="rounded-full bg-[#f4f4f2] px-5 py-3 text-[12px] font-semibold text-black"
        >
          Back home
        </Link>
      </header>

      <main className="pb-20 pt-16 md:pt-24">
        <div className="max-w-[780px]">
          <p className="inline-flex rounded-full bg-[var(--accent-soft)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
            Contribute
          </p>

          <h1 className="mt-7 text-[56px] font-semibold leading-[0.9] tracking-[-0.075em] text-black sm:text-[84px]">
            Help people discover somewhere worth going.
          </h1>

          <p className="mt-6 max-w-[540px] text-[14px] leading-relaxed text-black/45">
            SPOTTED becomes better when people add real places, useful details,
            honest stories and photos from the places they visit.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {contributionOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.title}
                href={option.href}
                className="group rounded-[32px] bg-[#f4f4f2] p-6 transition-colors hover:bg-[var(--accent-soft)]"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-white">
                  <Icon size={18} />
                </span>

                <h2 className="mt-8 text-[34px] font-semibold leading-[0.92] tracking-[-0.065em] text-black">
                  {option.title}
                </h2>

                <p className="mt-4 text-[13px] leading-relaxed text-black/45">
                  {option.description}
                </p>

                <div className="mt-8 flex size-11 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
