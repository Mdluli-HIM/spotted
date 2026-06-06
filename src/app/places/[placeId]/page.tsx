import type { Metadata } from "next";

import { PlacePageResolver } from "@/components/place/place-page-resolver";
import { places } from "@/data/places";
import { siteConfig } from "@/lib/site";

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

export async function generateMetadata({
  params,
}: PlacePageProps): Promise<Metadata> {
  const { placeId } = await params;
  const place = places.find((item) => item.id === placeId);

  if (!place) {
    return {
      title: "Community place — SPOTTED",
      description: "A community-added place on SPOTTED.",
    };
  }

  const pageUrl = `${siteConfig.url}/places/${place.id}`;

  return {
    title: `${place.name} — SPOTTED`,
    description: place.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${place.name} — SPOTTED`,
      description: place.description,
      url: pageUrl,
      siteName: "SPOTTED",
      type: "website",
      images: [
        {
          url: place.image,
          alt: place.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${place.name} — SPOTTED`,
      description: place.description,
      images: [place.image],
    },
  };
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { placeId } = await params;

  return (
    <main className="min-h-dvh w-full overflow-x-hidden bg-white">
      <div className="min-h-dvh w-full bg-white px-4 py-4 sm:px-8 sm:py-7 lg:px-16 lg:py-9 xl:px-20">
        <PlacePageResolver placeId={placeId} />
      </div>
    </main>
  );
}
