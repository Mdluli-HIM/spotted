import type { Metadata } from "next";

import { PlacePageResolver } from "@/components/place/place-page-resolver";
import { places } from "@/data/places";
import { siteConfig } from "@/lib/site";
import { PageShell } from "@/components/layout/page-shell";

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
    <PageShell>
      <PlacePageResolver placeId={placeId} />
    </PageShell>
  );
}
