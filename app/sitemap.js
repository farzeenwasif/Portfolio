const SITE = "https://farzeensportfolio.vercel.app";

// Only real pages belong here. Google ignores "#section" URLs.
export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: SITE, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE}/projects`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
