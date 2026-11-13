import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProjectGrid from "@/components/project/ProjectGrid";

export const metadata = {
  title: "Projects | Farzeen Wasif",
  description:
    "All projects by Farzeen Wasif — landing pages, agency sites, portfolios and dashboards built with React, Next.js and Tailwind CSS.",
  alternates: {
    canonical: "https://farzeensportfolio.vercel.app/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="bg min-h-screen">
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
            A collection of websites, landing pages and dashboards I&apos;ve
            designed and built.
          </p>
        </header>

        <ProjectGrid />
      </main>
      <Footer />
    </div>
  );
}
