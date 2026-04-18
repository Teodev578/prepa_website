"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

type NavLink = { label: string; href: string; active: boolean };
type Position = { left: number; width: number; opacity: number };

// ─── New Navigation Items ──────────────────────────────────────────────────

function NavLinks({ links }: { links: NavLink[] }) {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative hidden md:flex items-center w-fit"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {links.map((link) => (
        <Tab key={link.label} setPosition={setPosition} link={link}>
          {link.label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  link,
}: {
  children: React.ReactNode;
  setPosition: any;
  link: NavLink;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-4 md:py-1.5 md:text-sm font-bold tracking-tight"
    >
      <Link href={link.href}>{children}</Link>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-foreground md:h-9"
    />
  );
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links: NavLink[] = [
    { label: "Home", href: "/", active: pathname === "/" },
    { label: "Services", href: "/services", active: pathname === "/services" },
    { label: "Portfolio", href: "/portfolio", active: pathname === "/portfolio" },
    { label: "About", href: "/about", active: pathname === "/about" },
    { label: "Contact", href: "/contact", active: pathname === "/contact" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[60] flex justify-between items-center px-4 md:px-6 h-12 bg-background/50 backdrop-blur-md rounded-2xl md:rounded-[1.25rem] transition-all duration-300 ${
          isScrolled 
            ? "border border-transparent" 
            : "border-2 border-foreground/80 dark:border-foreground/80"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-base md:text-lg font-bold tracking-tight uppercase font-sans text-foreground py-1 px-2">
            PRECISION AUTO
          </Link>
        </div>

        {/* Center Nav (Sticky tabs style) */}
        <div className="flex items-center">
          <NavLinks links={links} />
        </div>

        {/* Actions (Language & Theme) */}
        <div className="flex items-center gap-1 md:gap-3">
          <div className="flex items-center gap-2">
             <button className="text-xs md:text-sm font-semibold hover:text-primary transition-colors text-foreground px-2">
               Fr/En
             </button>
             <button
               onClick={toggleTheme}
               className="flex items-center justify-center hover:text-primary transition-colors text-foreground p-2"
               aria-label="Changer de thème"
             >
               <span className="material-symbols-outlined text-lg">
                 {theme === "dark" ? "light_mode" : "dark_mode"}
               </span>
             </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-foreground text-background"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </nav>

      {/* NavigationDrawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="bg-background h-full w-80 border-r border-border flex flex-col gap-4 p-8 shadow-[60px_0_100px_rgba(0,0,0,0.1)] ml-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-primary font-headline font-bold text-xl uppercase">MENU</span>
              <button onClick={() => setIsOpen(false)}>
                <span className="material-symbols-outlined text-foreground">close</span>
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
                     link.label === "Portfolio" ? "collections" :
                     link.label === "About" ? "info" : "mail"}
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
