export const siteConfig = {
  name: "SPOTTED",
  description:
    "Discover places through community stories, honest recommendations and shared experiences.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
};
