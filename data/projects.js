// Single source of truth for all projects.
// The home page shows the first FEATURED_COUNT; /projects shows them all.
// Optional fields: linkLabel (button text, default "View Project"), repo (adds a "View Code" button),
// imageAlt (describes the screenshot for SEO/screen readers), status (small note under the button).
export const FEATURED_COUNT = 3;

// Descriptive alt text for a project's screenshot (good for SEO and screen readers).
export const projectImageAlt = (p) =>
  p.imageAlt || `Screenshot of ${p.title} (${p.tag}), built by Farzeen Wasif`;

export const projects = [
  {
    tag: "Full Stack SaaS",
    title: "Tasklytic — AI Task & Finance Dashboard",
    description:
      "Tasklytic is a full-stack SaaS app that turns a one-line note, a voice message or a photo into tasks, plans your day around them, and tracks hours, bills, budgets and freelance invoices in one place. It includes JWT authentication, a dashboard with charts and an activity log, a Premium plan with Paddle subscriptions, and AI features such as subtask breakdowns and weekly insights, built on a REST API with Express and MongoDB.",
    image: "/tasklytic.png",
    imageAlt:
      "Tasklytic landing page: 'Get it out of your head. Get it done.' hero with a 3D bar chart and a task dashboard preview",
    link: "https://tasklytic-blue.vercel.app/",
    linkLabel: "Live Demo",
    repo: "https://github.com/farzeenwasif/Tasklytic",
    stack: ["React", "Vite", "Tailwind CSS", "Three.js", "Node.js", "Express", "MongoDB", "JWT", "Paddle", "Cloudinary"],
  },
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
];
