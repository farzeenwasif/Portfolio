// Single source of truth for all projects.
// The home page shows the first FEATURED_COUNT; /projects shows them all.
// Optional fields: linkLabel (button text, default "View Project"), status (small note under the button).
export const FEATURED_COUNT = 3;

export const projects = [
  {
    tag: "SaaS Landing Page",
    title: "LeaFlow — Online Accounting",
    description:
      "LeaFlow is a landing page for an online accounting service built for freelancers and small businesses. It guides visitors through a three-step onboarding flow, transparent pricing, an app feature showcase with invoicing and bank sync, bank integrations and client testimonials, ending with a contact form — all designed around clear conversion paths.",
    image: "/projectv4.png",
    link: "https://leaflowweb.vercel.app/",
    stack: ["Next.js", "React", "Tailwind CSS", "Lucide"],
  },
  {
    tag: "Digital Agency",
    title: "Kliky Agency Website",
    description:
      "Kliky is a modern digital agency website designed to showcase professional services including Graphic Designing, AI-powered image creation, Web Development, and Digital Marketing.",
    image: "/project1.png",
    link: "https://klikly-v1.vercel.app",
    stack: ["Next.js", "Tailwind CSS", "GSAP", "React Three Fiber", "Firebase"],
  },
  {
    tag: "Portfolio Website",
    title: "Richard Hanrick Portfolio",
    description:
      "Developed a modern and responsive personal portfolio website featuring a clean dark UI, smooth navigation, and structured content sections. The project focuses on professional presentation, performance optimization, and user-friendly design. Built with React and Vite, ensuring fast loading, scalability, and a polished user experience across all devices.",
    image: "/projectv2.png",
    link: "https://richardhanrickportfolio.vercel.app",
    stack: ["React", "Vite", "CSS3"],
  },
  {
    tag: "Dashboard",
    title: "Task Management Admin Dashboard",
    description:
      "A full-stack Task Management Admin Dashboard that lets administrators create, prioritise and track tasks from one place. Includes secure JWT authentication, task status and priority management, image uploads, and a RESTful Express API backed by MongoDB.",
    image: "/projectv3.png",
    link: "https://github.com/Farzeenwasif/admin-dashboard",
    linkLabel: "View Code",
    status: "Live demo coming soon",
    stack: ["React", "Vite", "Tailwind CSS", "Material UI", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
  },
];
