import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://farzeensportfolio.vercel.app";
const TITLE = "Farzeen Wasif | Freelance Full Stack Web & Mobile App Developer";
const DESCRIPTION =
  "Farzeen Wasif is a freelance full stack developer in Pakistan building fast, SEO-friendly web and mobile apps with React, Next.js, React Native, Node.js and MongoDB. Available for hire worldwide.";
const SOCIAL_DESCRIPTION =
  "Freelance full stack web & mobile app developer. React, Next.js, React Native, Node.js. Available for freelance and remote work.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Farzeen Wasif",
  },
  description: DESCRIPTION,
  applicationName: "Farzeen Wasif Portfolio",
  keywords: [
    "Farzeen Wasif",
    "Farzeen Siddiqui",
    "freelance web developer",
    "freelance full stack developer",
    "freelance React developer",
    "freelance Next.js developer",
    "hire Next.js developer",
    "hire React developer",
    "React Native developer",
    "MERN stack developer",
    "full stack developer Pakistan",
    "web developer Faisalabad",
    "remote web developer",
    "frontend developer",
  ],
  authors: [{ name: "Farzeen Wasif", url: SITE_URL }],
  creator: "Farzeen Wasif",
  publisher: "Farzeen Wasif",
  category: "technology",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    siteName: "Farzeen Wasif",
    locale: "en_US",
    firstName: "Farzeen",
    lastName: "Wasif",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Farzeen Wasif, freelance full stack web and mobile app developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Farzeen3284",
    creator: "@Farzeen3284",
    title: TITLE,
    description: SOCIAL_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Icons come from app/icon1.svg, app/icon2.png, app/apple-icon.png and public/favicon.ico.
  verification: {
    google: "kCk7rusaqikn6su9cco5Luobqb-ptsFHYGqNWCCjBzU",
  },
};

export const viewport = {
  themeColor: "#000000",
};

// Structured data: tells Google who you are, what you do and where to find you.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Farzeen Wasif",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Farzeen Wasif",
      alternateName: "Farzeen Siddiqui",
      jobTitle: "Freelance Full Stack Web & Mobile App Developer",
      description: DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/user.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Faisalabad",
        addressCountry: "PK",
      },
      knowsAbout: [
        "Web Development",
        "Full Stack Development",
        "React",
        "Next.js",
        "React Native",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "GSAP",
        "Three.js",
        "Search Engine Optimization",
      ],
      sameAs: [
        "https://github.com/farzeenwasif",
        "https://www.linkedin.com/in/farzeen-wasif/",
        "https://x.com/Farzeen3284",
        "https://www.instagram.com/farzeen_wasif/",
        "https://www.facebook.com/profile.php?id=61563782512766",
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
