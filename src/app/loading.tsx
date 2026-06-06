import { BrandWordmark } from "@/components/brand/brand-wordmark";

export default function Loading() {
  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-white px-4">
      <div className="text-center">
        <BrandWordmark />

        <div className="mx-auto mt-8 h-1.5 w-32 overflow-hidden rounded-full bg-[#f4f4f2]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[var(--accent)]" />
        </div>

        <p className="mt-5 text-[12px] font-medium text-black/35">
          Finding places worth going to...
        </p>
      </div>
    </main>
  );
}
