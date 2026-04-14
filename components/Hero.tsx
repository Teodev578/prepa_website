export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-60"
          alt="Close-up of a high-end black sports car with exceptional reflective ceramic coating"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKcYtjp3QdHeL091UGdB23QHaz3dMpY2mbnzojClN8-K3CFX4U4isrkz3mA65eKXYk07VIAhDOZFc3E1nAqnfHcj36FTmS1jHuIm-2P3mngbD_uqx4nzbj7QKWhGlNiyYZ0IOpVVfZ0XJ2CxEptVIUwymUGemR0FS5VrHrp6wx3XbUV_5irF8N1boJtk8RTTRqLyAgcDiGirqZWGz3AD2aKbKBa87Y9U2a0nN_x7TTW8Y2YXnvY-TOiQE9qqG_4rMEP_GZT1WAHDo"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl">
          <span className="font-label uppercase tracking-[0.3em] text-primary text-sm font-black mb-6 block">
            ENGINEERED PERFECTION
          </span>
          <h1 className="text-6xl md:text-9xl font-headline font-bold text-foreground leading-[0.85] tracking-tighter uppercase italic mb-8">
            L'ART DE LA <br />
            <span className="text-transparent border-t-2 border-b-2 border-primary/30 bg-clip-text bg-gradient-to-r from-primary to-primary-foreground">
              PRÉCISION
            </span>
          </h1>
          <p className="text-foreground/80 text-base md:text-lg max-w-xl font-sans leading-relaxed mb-10 border-l-2 border-primary/40 pl-6">
            Sublimez chaque courbe. Protégez chaque micron. Nous redéfinissons l'esthétique automobile à travers une expertise technique sans compromis.
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="bg-primary text-primary-foreground font-headline font-black uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 text-xs md:text-sm hover:shadow-[0_0_30px_rgba(155,44,44,0.5)] transition-all">
              DÉCOUVRIR NOS SERVICES
            </button>
            <button className="border border-border text-foreground font-headline font-black uppercase tracking-widest px-8 md:px-10 py-4 md:py-5 text-xs md:text-sm hover:bg-muted transition-all">
              NOTRE PORTFOLIO
            </button>
          </div>
        </div>
      </div>

      {/* Technical specs overlay */}
      <div className="absolute right-0 bottom-24 hidden lg:block bg-card/80 backdrop-blur-md p-8 border-l border-primary/20">
        <div className="space-y-6">
          <SpecItem label="HARDNESS RATING" value="9H+ CERAMIC" />
          <SpecItem label="CURING PROCESS" value="INFRARED HEAT" />
          <SpecItem label="REFLECTIVITY" value="99.8% GLOSS" />
        </div>
      </div>
    </section>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-label text-primary tracking-widest uppercase mb-1">{label}</div>
      <div className="text-2xl font-headline font-bold text-white tracking-tighter">{value}</div>
    </div>
  );
}
