import { notFound } from "next/navigation";

import { PlaceExperience } from "@/components/place/place-experience";
import { places } from "@/data/places";

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
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fcfcfb]">
      <section className="min-h-screen w-full overflow-x-hidden bg-[#fcfcfb] px-4 py-4 sm:px-8 sm:py-7 lg:px-16 lg:py-9 xl:px-20">
        <PlaceExperience place={place} />
      </section>
    </main>
  );
}
