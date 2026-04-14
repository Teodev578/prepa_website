export default function Testimonials() {
  const testimonials = [
    {
      name: "JULIEN L.",
      car: "PORSCHE 911 GT3",
      initials: "JL",
      text: '"Le résultat sur ma Porsche est bluffant. La peinture a retrouvé une profondeur incroyable, bien plus belle qu\'à sa sortie d\'usine."',
    },
    {
      name: "MARC A.",
      car: "FERRARI 488",
      initials: "MA",
      text: '"Un professionnalisme rare. Chaque détail est inspecté à la loupe. Le traitement céramique facilite énormément mes lavages hebdomadaires."',
      highlight: true,
    },
    {
      name: "SOPHIE D.",
      car: "RANGE ROVER VOGUE",
      initials: "SD",
      text: "\"Prestation intérieure incroyable. J'avais des taches tenaces sur mes cuirs clairs qui ont totalement disparu. Comme neuf.\"",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="font-label text-primary tracking-widest uppercase text-xs font-black">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground uppercase tracking-tighter mt-4 italic">
            LA VOIX DE NOS CLIENTS
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-card p-8 md:p-10 border-t-2 border-transparent hover:border-primary transition-all duration-300 shadow-sm ${
                t.highlight ? "lg:scale-105 z-20 shadow-xl border-t-primary" : ""
              }`}
            >
              <div className="flex text-primary mb-6">
                {[...Array(5)].map((_, starIndex) => (
                  <span
                    key={starIndex}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-foreground font-sans italic mb-8 leading-relaxed">
                {t.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted/50 flex items-center justify-center font-headline font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <div className="text-foreground font-headline font-bold uppercase text-sm tracking-widest">
                    {t.name}
                  </div>
                  <div className="text-muted-foreground text-[10px] font-label uppercase font-bold">
                    {t.car}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
