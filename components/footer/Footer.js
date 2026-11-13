import { Github } from "lucide-react";

const Footer = () => {
  const socialImgs = [
    { name: "insta", imgPath: "/images/social-1.png",link: "https://www.instagram.com/farzeen_wasif/" },
    { name: "fb", imgPath: "/images/fb.png",link: "https://www.facebook.com/profile.php?id=61563782512766" },
    { name: "x", imgPath: "/images/x.png",link: "https://x.com/Farzeen3284" },
    { name: "linkedin", imgPath: "/images/linkedin.png", link: "https://www.linkedin.com/in/farzeen-wasif/" },
    { name: "github", Icon: Github, link: "https://github.com/farzeenwasif" },
  ];

  return (
      <footer className="relative z-10 border-t border-white/10 text-white/50 px-5 md:px-10 py-8 md:py-10 flex items-center justify-center">

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-5 w-full">
        
        {/* Left column */}
        <div className="flex justify-center md:justify-start">
          <p className="font-mono text-sm">Built with Next.js &amp; GSAP</p>
        </div>

        {/* Middle column - social icons */}
        <div className="flex items-center justify-center gap-5">
          {socialImgs.map((socialImg, index) => (
            <div
              key={index}
              className="border border-neutral-700 bg-neutral-800 flex justify-center items-center rounded-xl size-10 md:size-12 cursor-pointer transition-all duration-300 hover:bg-neutral-700"
            >
              <a
                key={index}
              href={socialImg.link}
              aria-label={`${socialImg.name} profile`}
              target="_blank"
              rel="noopener noreferrer">
              {socialImg.Icon ? (
                <socialImg.Icon className="w-5 h-5 text-white" aria-hidden="true" />
              ) : (
                <img
                  className="inline-block w-5 h-5 object-contain"
                  src={socialImg.imgPath}
                  alt=""
                />
              )}
              </a>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Farzeen <span className="text-[#14827ec1]">Wasif</span>. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
