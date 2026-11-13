// Small tech-stack chips shown on project cards.
export default function StackList({ stack = [], className = "" }) {
  if (!stack.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Tech stack">
      {stack.map((tech) => (
        <li
          key={tech}
          className="font-mono text-xs text-white/75 bg-white/5 border border-white/10 rounded-md px-2.5 py-1"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}
