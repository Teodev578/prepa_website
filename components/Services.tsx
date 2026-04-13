export default function Services() {
  const stats = [
    { value: "500+", label: "VÉHICULES TRAITÉS" },
    { value: "10Y", label: "D'EXPERTISE" },
    { value: "9H+", label: "GRADE CÉRAMIQUE" },
    { value: "100%", label: "SATISFACTION" },
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="font-label text-primary tracking-widest uppercase text-xs font-black">
            CORE CAPABILITIES
          </span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-white uppercase tracking-tighter mt-4 italic">
            INGÉNIERIE DU DÉTAIL
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-secondary/80 font-body text-sm leading-loose">
            Chaque véhicule qui entre dans notre atelier est traité comme une pièce d'orfèvrerie. Nous utilisons exclusivement des composants de grade aérospatial pour des résultats dépassant l'usine.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Main Feature */}
        <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-low h-[400px] md:h-[500px]">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
            alt="Professional detailer applying ceramic coating"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBojH10RpldKyZejzH4g7HohDT7vj3LhjwAoVS4rw7-wKY7xekwLjGoa6qDYiAeRJ0q6rOwNQ-hxDoARIxAIguMnWT-oVBBs6_uUOPGFVnxMiuq_rrwKTp8bHLHVYOdE6yc8hgoieozWXawMt4KK3Xy0HnTWnbmBOxSldZVNGh5N54HimFSn7WaX5yGotVpLhOHYwzcGvbkzcxJXvNSLJYsKr0qL4dvau0thiW_19YoK-WOWIehZ0uNHduEdrJKP6oZuT25lY6cilo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-10">
            <span className="inline-block bg-primary text-on-primary font-label text-[10px] font-black tracking-widest px-3 py-1 mb-4">
              PLATINUM LEVEL
            </span>
            <h3 className="text-3xl md:text-4xl font-headline font-bold text-white uppercase mb-4 italic">
              PROTECTION CÉRAMIQUE
            </h3>
            <p className="text-secondary max-w-md font-body text-sm mb-6">
              Bouclier hydrophobe permanent contre les UV, les contaminants chimiques et les micro-rayures.
            </p>
            <a
              className="inline-flex items-center text-primary font-headline font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all"
              href="#"
            >
              En savoir plus <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Secondary Feature 1 */}
        <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-low h-[300px] md:h-auto">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            alt="Close-up of a high-speed orbital polisher"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBh6h17-TSksxOSdSuTqrKK61OWp2n6z9hGpB0OTWDfOcRpfchea87znrNYAmf0bEvdryQ1VPbIB_dL2Sl3cP_pGiy1Xc_WhdRV-kBa2ew7UQezNjHFc4RnWwX5tVzwwGNEJq82FhdX_10TkLGkdeJRl9SpOYfhlxjmDW_KKYezvn0-a7GjCz47DVsZYp7PpNOfpWMLENBOcEdULnOP2RiT9pOFweIRdEFyd41BqHABng66W3VNX3SZjyCf9RWesw4bIpUn8ahUTw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-headline font-bold text-white uppercase italic">
              POLISSAGE 3 ÉTAPES
            </h3>
            <p className="text-secondary/70 font-body text-xs mt-2">
              Correction totale des défauts de vernis pour un fini miroir absolu.
            </p>
          </div>
        </div>

        {/* Secondary Feature 2 */}
        <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-low h-[300px] md:h-[400px]">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            alt="Interior of a luxury sports car"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo92lO_ISWydlOlU8OO5y_7ZFbi6Ck4EZ_Krqs6AZZPrvxgvCmhdtqAby1-qAMswOWJZnphkUTpAAKAlW8j4m406B2-Q_6zumtqUrFozFctFa6cxPToyQOVnkg5aWpws2_rnt7tcW5C1yylFAutNlcDCC8Gz-WsJA8VeMqVuUG_aadgEYW3YSkp-4i4nf1EyEI0lJLT_narn9aJpWjiHZfz6gif6PAujlLLeXKFKc7g4KgXJGiycy0j0b7xgD8hu6RN6qeDPOcUOU"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-headline font-bold text-white uppercase italic">
              DETAIL INTÉRIEUR
            </h3>
            <p className="text-secondary/70 font-body text-xs mt-2">
              Nettoyage chirurgical et nutrition des cuirs et alcantaras originels.
            </p>
          </div>
        </div>

        {/* Tech Stats Block */}
        <div className="md:col-span-8 bg-surface-container-highest border-l-4 border-primary p-8 md:p-12 flex flex-col justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] font-label text-secondary tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
