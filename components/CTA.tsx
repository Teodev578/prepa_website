export default function CTA() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background relative border-t border-outline-variant/10">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tighter mb-8 italic">
          PRÊT POUR L'EXCELLENCE ?
        </h2>
        <p className="text-secondary max-w-2xl font-body text-base md:text-lg mb-12">
          Confiez-nous votre véhicule pour une transformation radicale. Devis personnalisé sous 24h après analyse de votre projet.
        </p>
        <div className="bg-surface-container-low p-1 border border-primary/20 flex flex-col md:flex-row w-full max-w-2xl">
          <input
            className="flex-grow bg-transparent border-none text-white font-label placeholder:text-secondary/30 focus:ring-0 px-8 py-5 outline-none"
            placeholder="VOTRE ADRESSE EMAIL"
            type="email"
          />
          <button className="bg-primary text-on-primary font-headline font-black uppercase tracking-widest px-12 py-5 hover:bg-primary-container transition-all">
            DEMANDER UN DEVIS
          </button>
        </div>
      </div>
    </section>
  );
}
