"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Home", href: "#", active: true },
    { label: "Services", href: "#" },
    { label: "Portfolio", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 rounded-none glass-nav flex justify-between items-center px-6 md:px-12 h-20 max-w-full mx-auto">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden flex items-center"
          >
            <span className="material-symbols-outlined text-[#00daf3]">menu</span>
          </button>
          <div className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic font-headline">
            PRECISION AUTO
          </div>
        </div>

        <div className="hidden md:flex gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-headline tracking-tighter uppercase font-bold transition-colors duration-300 pb-1 ${
                link.active 
                  ? "text-[#00daf3] border-b-2 border-[#00daf3]" 
                  : "text-[#c6c6c6] hover:text-[#00daf3]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold uppercase tracking-widest px-6 md:px-8 py-3 text-[10px] md:text-xs scale-95 hover:scale-100 transition-all duration-200 ease-in-out shadow-[0_0_20px_rgba(0,218,243,0.3)]">
          Get Quote
        </button>
      </nav>

      {/* NavigationDrawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <aside 
            className="bg-[#131313] h-full w-80 border-r border-[#c6c6c6]/10 flex flex-col gap-4 p-8 shadow-[60px_0_100px_rgba(0,218,243,0.05)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-[#00daf3] font-headline font-bold text-xl uppercase">PRECISION MENU</span>
              <button onClick={() => setIsOpen(false)}>
                <span className="material-symbols-outlined text-secondary">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-4 p-3 font-label tracking-[0.05em] uppercase text-xs font-bold transition-all duration-300 ${
                    link.active 
                      ? "bg-[#00daf3]/10 text-[#00daf3] border-l-2 border-[#00daf3]" 
                      : "text-[#c6c6c6] hover:bg-[#c6c6c6]/5 hover:pl-2"
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {link.label === "Home" ? "home" : 
                     link.label === "Services" ? "layers" :
                     link.label === "Portfolio" ? "collections" : "mail"}
                  </span>
                  {link.label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
