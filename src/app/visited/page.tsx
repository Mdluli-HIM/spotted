import { PageShell } from "@/components/layout/page-shell";
import { PersonalPlacesExperience } from "@/components/places/personal-places-experience";

export default function VisitedPage() {
  return (
    <PageShell>
      <PersonalPlacesExperience mode="visited" />
    </PageShell>
  );
}
