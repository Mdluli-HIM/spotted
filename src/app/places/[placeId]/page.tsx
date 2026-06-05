import { notFound } from "next/navigation";

import { places } from "@/data/places";
import { PlaceExperience } from "@/components/place/place-experience";

type PlacePageProps = {
  params: Promise<{
    placeId: string;
  }>;
};

export function generateStaticParams() {
  return places.map((place) => ({
    placeId: place.id,
  }));
}

export async function generateMetadata({ params }: PlacePageProps) {
  const { placeId } = await params;
  const place = places.find((item) => item.id === placeId);

  if (!place) {
    return {
      title: "Place not found — SPOTTED",
    };
  }

  return {
    title: `${place.name} — SPOTTED`,
    description: place.description,
  };
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { placeId } = await params;
  const place = places.find((item) => item.id === placeId);

  if (!place) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#e7e3d7] p-3 sm:p-5 lg:p-0">
      <section className="mx-auto min-h-[calc(100vh-24px)] w-full overflow-x-hidden rounded-[28px] bg-[#fcfcfb] px-5 py-5 shadow-[0_30px_80px_rgba(36,33,24,0.08)] sm:min-h-[calc(100vh-40px)] sm:px-8 sm:py-7 lg:min-h-screen lg:rounded-none lg:px-16 lg:py-9 lg:shadow-none xl:px-20">
        <PlaceExperience place={place} />
      </section>
    </main>
  );
}
