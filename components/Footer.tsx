export default function Footer() {
  const socials = ["Facebook", "Instagram", "YouTube"];
  const legal = ["Privacy Policy", "Terms of Service"];

  return (
    <footer className="w-full rounded-none border-t border-border bg-card flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-16">
      <div className="mb-8 md:mb-0 text-center md:text-left">
        <div className="text-xl font-black tracking-tighter text-foreground uppercase mb-2">
          PRECISION AUTOMOTIVE
        </div>
        <div className="font-label uppercase tracking-widest text-[10px] text-muted-foreground">
          © 2024 PRECISION AUTOMOTIVE EXCELLENCE. ALL RIGHTS RESERVED.
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {[...socials, ...legal].map((link) => (
          <a
            key={link}
            href="#"
            className="font-label uppercase tracking-widest text-[10px] text-muted-foreground hover:text-primary transition-all opacity-80 hover:opacity-100"
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}
