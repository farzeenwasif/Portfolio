import Link from "next/link";


export default function MobileMenu({ menuOpen, setMenuOpen }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[50vw] max-w-[300px] backdrop-blur-2xl z-[40] transition-transform duration-300 ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex  flex-col items-center justify-center h-full gap-8 pt-20 text-white">
        <Link onClick={() => setMenuOpen(false)} href="/#hero">Home</Link>
        <Link onClick={() => setMenuOpen(false)} href="/#project">Projects</Link>
        <Link onClick={() => setMenuOpen(false)} href="/#about">About</Link>
        <Link onClick={() => setMenuOpen(false)} href="/#experience">Experience</Link>
        <Link onClick={() => setMenuOpen(false)} href="/#contact">Contact</Link>
      </div>
    </div>
  );
}
