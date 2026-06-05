import { StoriesExperience } from "@/components/stories/stories-experience";

export default function StoriesPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#e7e3d7] p-3 sm:p-5 lg:p-0">
      <section className="mx-auto min-h-[calc(100vh-24px)] w-full overflow-x-hidden rounded-[28px] bg-[#fcfcfb] px-5 py-5 shadow-[0_30px_80px_rgba(36,33,24,0.08)] sm:min-h-[calc(100vh-40px)] sm:px-8 sm:py-7 lg:min-h-screen lg:rounded-none lg:px-16 lg:py-9 lg:shadow-none xl:px-20">
        <StoriesExperience />
      </section>
    </main>
  );
}
