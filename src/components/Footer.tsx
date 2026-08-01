import { Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/AnmolKumar632/AnmolKumar632/tree/main", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/anmol-kumar-b709762b7", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400 flex items-center gap-1">
          &copy; {new Date().getFullYear()} Anmol Kumar. Made with{" "}
          <Heart size={14} className="text-violet-400 fill-violet-400" /> using
          React & Tailwind CSS
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-violet-400 transition-colors"
              aria-label={link.label}
            >
              <link.icon width={18} height={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
