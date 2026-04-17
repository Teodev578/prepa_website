"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

type NavLink = { label: string; href: string; active: boolean };
type Position = { left: number; width: number; opacity: number };

// ─── Sliding cursor nav list (desktop) ───────────────────────────────────────

function NavLinks({ links }: { links: NavLink[] }) {
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 });

  return (
    <ul
      className="relative hidden md:flex items-center"
      onMouseLeave={() => setPosition((p) => ({ ...p, opacity: 0 }))}
    >
      {links.map((link) => (
        <NavTab key={link.label} link={link} setPosition={setPosition} />
      ))}
      {/* Animated sliding pill */}
      <motion.li
        animate={position}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute z-0 h-8 rounded-full bg-background pointer-events-none"
      />
    </ul>
  );
}

function NavTab({
  link,
  setPosition,
}: {
  link: NavLink;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className="relative z-10"
    >
      <Link
        href={link.href}
        className={`block px-4 py-1.5 font-headline tracking-wider uppercase font-bold text-sm mix-blend-difference ${
          link.active ? "text-primary" : "text-background"
        }`}
      >
        {link.label}
      </Link>
    </li>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const links: NavLink[] = [
    { label: "Home", href: "/", active: pathname === "/" },
    { label: "Services", href: "/services", active: pathname === "/services" },
    { label: "Portfolio", href: "/portfolio", active: pathname === "/portfolio" },
    { label: "Contact", href: "/contact", active: pathname === "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full bg-foreground/50 backdrop-blur-xl flex justify-between items-center px-6 md:px-8 h-16 border border-white/10 shadow-lg text-background text-shadow-sm transition-colors duration-300">
        <div className="flex items-center">
          <Link href="/" className="text-lg md:text-xl font-black tracking-tighter uppercase italic font-headline">
            PRECISION AUTO
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <NavLinks links={links} />

          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold hover:text-primary transition-colors">
              Fr/En
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center hover:text-primary transition-colors"
              aria-label="Changer de thème"
            >
              <span className="material-symbols-outlined">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center justify-center hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </nav>

      {/* NavigationDrawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="bg-card h-full w-80 border-r border-border flex flex-col gap-4 p-8 shadow-[60px_0_100px_rgba(0,0,0,0.1)] ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-primary font-headline font-bold text-xl uppercase">MENU</span>
              <button onClick={() => setIsOpen(false)}>
                <span className="material-symbols-outlined text-secondary-foreground">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 p-3 font-label tracking-[0.05em] uppercase text-sm font-bold transition-all duration-300 ${
                    link.active
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-muted hover:pl-2"
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {link.label === "Home" ? "home" :
                     link.label === "Services" ? "layers" :
                     link.label === "Portfolio" ? "collections" : "mail"}
                  </span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
