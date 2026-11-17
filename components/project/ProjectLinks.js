// Primary link (live site) plus an optional "View Code" link, shared by the home page and /projects.
const btn =
  "group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border font-semibold transition-all duration-300";

export default function ProjectLinks({ project }) {
  return (
    <div className="pt-2">
      <div className="flex flex-wrap gap-3">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.linkLabel || "View Project"}: ${project.title}`}
          className={`${btn} border-white/20 bg-white/5 text-white hover:bg-[#14827e] hover:border-[#14827e]`}
        >
          {project.linkLabel || "View Project"}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
            &#8599;
          </span>
        </a>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code of ${project.title} on GitHub`}
            className={`${btn} border-white/10 text-gray-300 hover:text-white hover:border-white/40`}
          >
            View Code
          </a>
        )}
      </div>
      {project.status && <p className="text-xs text-white/50 pt-2">{project.status}</p>}
    </div>
  );
}
