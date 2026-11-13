import Image from "next/image";

// Screenshot shown inside a minimal browser window with the project's domain.
export default function BrowserFrame({ src, alt, link, priority = false, sizes }) {
  let domain = link;
  try {
    domain = new URL(link).hostname.replace(/^www\./, "");
  } catch {}

  return (
    <div className="group/frame rounded-xl overflow-hidden border border-white/15 bg-[#111] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 min-w-0 truncate text-center text-xs text-gray-400 bg-white/5 rounded-md py-1 px-3">
          {domain}
        </div>
      </div>
      <div className="overflow-hidden aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={750}
          priority={priority}
          sizes={sizes}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/frame:scale-105"
        />
      </div>
    </div>
  );
}
