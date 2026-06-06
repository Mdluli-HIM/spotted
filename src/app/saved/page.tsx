import { PageShell } from "@/components/layout/page-shell";
import { PersonalPlacesExperience } from "@/components/places/personal-places-experience";

export default function SavedPage() {
  return (
    <PageShell>
      <PersonalPlacesExperience mode="saved" />
    </PageShell>
  );
}
