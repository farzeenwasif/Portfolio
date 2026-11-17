import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProjectGrid from "@/components/project/ProjectGrid";
import { projects } from "@/data/projects";

const PAGE_URL = "https://farzeensportfolio.vercel.app/projects";
const DESCRIPTION =
  "Freelance web development projects by Farzeen Wasif: full stack SaaS apps, landing pages, agency websites, portfolios and dashboards built with React, Next.js, Node.js and Tailwind CSS.";

export const metadata = {
  title: "Projects: Freelance Web Development Work",
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    url: PAGE_URL,
    title: "Projects by Farzeen Wasif, Freelance Full Stack Developer",
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Farzeen Wasif projects" }],
  },
};

// Lists each project as a piece of creative work by Farzeen Wasif.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: PAGE_URL,
  name: "Projects by Farzeen Wasif",
  description: DESCRIPTION,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        url: p.link,
        image: `https://farzeensportfolio.vercel.app${p.image}`,
        keywords: p.stack.join(", "),
        creator: { "@id": "https://farzeensportfolio.vercel.app/#person" },
      },
    })),
  },
};

export default function ProjectsPage() {
  return (
    <div className="bg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="relative w-full max-w-7xl mx-auto px-5 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="pb-8">
          <Link
            href="/#project"
            className="inline-flex items-center gap-2 text-[#c9c9c9] hover:text-[#14827ec1] transition-colors duration-300"
          >
            &larr; Back to Home
          </Link>
        </div>

        <header className="flex flex-col items-center gap-4 text-center pb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            All Projects
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-[15px] md:text-base">
            Freelance and personal projects I&apos;ve designed and built: full
            stack SaaS apps, landing pages, agency websites and dashboards.
          </p>
        </header>

        <ProjectGrid />
      </main>
      <Footer />
    </div>
  );
}
