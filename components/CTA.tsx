export default function CTA() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background relative border-t border-border">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-headline font-bold text-foreground uppercase tracking-tighter mb-8 italic">
          PRÊT POUR L'EXCELLENCE ?
        </h2>
        <p className="text-muted-foreground max-w-2xl font-sans text-base md:text-lg mb-12">
          Confiez-nous votre véhicule pour une transformation radicale. Devis personnalisé sous 24h après analyse de votre projet.
        </p>
        <div className="bg-card p-1 border border-primary/20 flex flex-col md:flex-row w-full max-w-2xl shadow-lg">
          <input
            className="flex-grow bg-transparent border-none text-foreground font-sans placeholder:text-muted-foreground/30 focus:ring-0 px-8 py-5 outline-none"
            placeholder="VOTRE ADRESSE EMAIL"
            type="email"
          />
          <button className="bg-primary text-primary-foreground font-headline font-black uppercase tracking-widest px-12 py-5 hover:bg-primary/90 transition-all shadow-md">
            DEMANDER UN DEVIS
          </button>
        </div>
      </div>
    </section>
  );
}
