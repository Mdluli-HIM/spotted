import { CreateStoryExperience } from "@/components/contribution/create-story-experience";

export default function CreateStoryPage() {
  return (
    <main className="min-h-dvh w-full overflow-x-hidden bg-white">
      <div className="min-h-dvh w-full bg-white px-4 py-4 sm:px-8 sm:py-7 lg:px-16 lg:py-9 xl:px-20">
        <CreateStoryExperience />
      </div>
    </main>
  );
}
