export default function CTA() {
  return (
    <section className="py-32 px-6 md:px-20 bg-background text-foreground relative border-b border-border overflow-hidden">
      {/* Technical background marks */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 text-primary font-mono text-xl">+</div>
        <div className="absolute top-10 right-10 text-primary font-mono text-xl">+</div>
        <div className="absolute bottom-10 left-10 text-primary font-mono text-xl">+</div>
        <div className="absolute bottom-10 right-10 text-primary font-mono text-xl">+</div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* Massive Text Area */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 uppercase tracking-widest">
              STATUS: READY
            </span>
            <div className="h-[1px] w-16 bg-foreground opacity-30"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tighter mb-6 leading-[0.85]">
            PRÊT POUR <br/> L'<span className="text-primary">EXCELLENCE</span>.
          </h2>
          
          <div className="flex gap-1 items-end h-8 opacity-40 mb-8">
            <div className="w-[1px] h-full bg-foreground"></div>
            <div className="w-[3px] h-[70%] bg-foreground"></div>
            <div className="w-[1px] h-full bg-foreground"></div>
            <div className="w-[4px] h-[40%] bg-foreground"></div>
            <div className="w-[2px] h-[90%] bg-foreground"></div>
          </div>

          <p className="font-mono text-[11px] md:text-xs text-muted-foreground max-w-md uppercase leading-relaxed tracking-wide">
            Déclenchez le protocole d'ingénierie. Entrez vos coordonnées ci-contre pour une analyse complète de votre véhicule. Devis calibré sous 24h.
          </p>
        </div>

        {/* Input & Action Area - Terminal feeling */}
        <div className="flex-1 w-full max-w-lg">
          <div className="border border-border bg-foreground text-background p-1 relative group">
            {/* Corner technical accents on input wrapper */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row w-full h-full">
              <div className="flex-grow flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-background/20">
                <span className="font-mono text-primary text-sm mr-4">{">"}</span>
                <input
                  className="w-full bg-transparent border-none text-background font-mono text-xs placeholder:text-background/40 focus:ring-0 outline-none uppercase tracking-widest"
                  placeholder="VOTRE_ADRESSE_EMAIL"
                  type="email"
                />
              </div>
              <button className="bg-primary text-primary-foreground font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-5 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                TRANSMETTRE
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            
            {/* Terminal decorative bottom border */}
            <div className="absolute -bottom-6 right-0 font-mono text-[8px] text-muted-foreground tracking-widest uppercase">
              SECURE_CONN_ESTABLISHED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
