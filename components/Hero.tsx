export default function Hero() {
  return (
    <section className="bg-background min-h-[100dvh] pt-[72px] md:pt-0 flex flex-col justify-center overflow-hidden relative">
      <div className="flex flex-col lg:flex-row w-full h-full min-h-[100dvh] lg:min-h-0">
        
        {/* Left Column : Image (Mobile: Top, Desktop: Left) */}
        <div className="w-full lg:w-1/2 relative flex items-stretch border-b lg:border-b-0 lg:border-r border-border min-h-[45vh] lg:min-h-[100dvh]">
          
          {/* Edge Menu/Annotations (Desktop left border) */}
          <div className="hidden lg:flex w-16 xl:w-20 shrink-0 flex-col justify-between items-center py-10 border-r border-border bg-background relative z-10">
            <div className="font-mono text-[10px] uppercase font-bold tracking-widest -rotate-90 whitespace-nowrap mt-20 text-muted-foreground">
              PRECISION AUTO
            </div>
            
            {/* Minimal burger menu hint */}
            <div className="flex flex-col gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
              <div className="w-6 h-[1.5px] bg-foreground"></div>
              <div className="w-4 h-[1.5px] bg-foreground"></div>
              <div className="w-8 h-[1.5px] bg-foreground"></div>
            </div>

            <div className="font-mono text-[10px] uppercase font-bold tracking-widest -rotate-90 whitespace-nowrap mb-20 text-muted-foreground">
              /ABOUT
            </div>
          </div>

          <div className="flex-grow relative overflow-hidden bg-muted">
            <img
              className="w-full h-full object-cover"
              alt="Detailing Porsche Technical"
              src="/images/hero_picture_1.png"
            />
            {/* Technical grid/cross over the image */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-8 left-8 text-white/50 font-mono text-xl">+</div>
                <div className="absolute bottom-8 right-8 text-white/50 font-mono text-xl">+</div>
                <div className="absolute bottom-8 left-8 font-mono text-[9px] text-white/50 tracking-widest [writing-mode:vertical-rl] rotate-180 md:[writing-mode:horizontal-tb] md:rotate-0">
                    COPYRIGHTS © 2026 PRECISION AUTO
                </div>
            </div>
          </div>
        </div>

        {/* Right Column : Typography (Mobile: Bottom, Desktop: Right) */}
        <div className="w-full lg:w-1/2 relative bg-background flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 lg:py-0">
          
          {/* Massive Cutoff Number (Edge Right) */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[35%] lg:translate-x-[40%] text-[60vw] lg:text-[35vw] font-sans font-black text-primary leading-none pointer-events-none z-0 select-none">
            01
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="lg:hidden font-mono text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">
              /ABOUT
            </div>

            <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-[6rem] tracking-tighter uppercase text-primary leading-[0.85] mb-10 relative">
              LA MAÎTRISE<br/>
              TECHNIQUE<br/>
              EST NOTRE<br/>
              CULTURE.
            </h1>
            
            <p className="text-foreground font-medium text-sm md:text-base leading-relaxed mb-12 lg:max-w-[400px]">
              Ici, aucun compromis. Le travail bien fait nous importe plus que tout, afin que votre véhicule ne reparte jamais le même de notre atelier.
            </p>

            {/* Buttons Technical Pattern */}
            <div className="flex flex-col sm:flex-row gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">
              <button className="relative px-8 py-5 bg-foreground text-background group overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  DÉCOUVRIR NOS SERVICES
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </span>
              </button>

              <button className="px-8 py-5 border border-border bg-transparent text-foreground hover:border-foreground transition-colors group flex items-center justify-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary block rounded-full"></span>
                NOTRE PORTFOLIO
              </button>
            </div>
          </div>
          
          {/* Subtle menu or corner indication top right (like "MENU" in image_4) */}
          <div className="absolute top-10 right-10 font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase hidden lg:block hover:text-foreground cursor-pointer transition-colors">
            MENU
          </div>

        </div>

      </div>
    </section>
  );
}
