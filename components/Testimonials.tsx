"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "Le résultat sur ma Porsche est bluffant. La peinture a retrouvé une profondeur incroyable, bien plus belle qu'à sa sortie d'usine.",
    author: "Julien L.",
    title: "PORSCHE 911 GT3",
    initials: "JL",
  },
  {
    quote: "Un professionnalisme rare. Chaque détail est inspecté à la loupe. Le traitement céramique facilite énormément mes lavages hebdomadaires.",
    author: "Marc A.",
    title: "FERRARI 488",
    initials: "MA",
  },
  {
    quote: "Prestation intérieure incroyable. J'avais des taches tenaces sur mes cuirs clairs qui ont totalement disparu. Comme neuf.",
    author: "Sophie D.",
    title: "RANGE ROVER VOGUE",
    initials: "SD",
  },
  {
    quote: "Le soin apporté aux jantes et aux étriers de freins est exceptionnel. On sent la passion du détail à chaque étape du nettoyage.",
    author: "Thomas B.",
    title: "BMW M4 COMPETITION",
    initials: "TB",
  },
  {
    quote: "C'est simple, ils ont redonné vie à ma carrosserie. L'équipe est super chaleureuse et prodigue d'excellents conseils pour l'entretien.",
    author: "Emma R.",
    title: "MERCEDES A45 AMG",
    initials: "ER",
  },
  {
    quote: "Polissage parfait, les micro-rayures ont totalement disparu. La voiture est resplendissante et protégée avec la céramique.",
    author: "Antoine V.",
    title: "TESLA MODEL 3",
    initials: "AV",
  },
  {
    quote: "J'ai déposé mon véhicule pour un traitement complet avant la vente. Il est parti dans la journée grâce à l'état irréprochable du véhicule !",
    author: "Olivier P.",
    title: "AUDI RS6",
    initials: "OP",
  },
  {
    quote: "La protection PPF posée sur la face avant est littéralement invisible. Travail d'orfèvre ! Je recommande les yeux fermés.",
    author: "Hugo M.",
    title: "PORSCHE TAYCAN",
    initials: "HM",
  },
  {
    quote: "Je cherchais un centre de confiance pour ma voiture de collection, ils ont su utiliser des produits respectueux et redonner vie au vernis usé.",
    author: "Jean-Pierre",
    title: "JAGUAR TYPE E",
    initials: "JP",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-20 lg:py-32 bg-background relative">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="font-label text-primary tracking-widest uppercase text-xs font-black">
            TESTIMONIALS
          </span>
          <h2 className="mx-auto mb-3 w-full text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tighter mt-4 italic uppercase">
            LA VOIX DE NOS CLIENTS
          </h2>
          <p className="text-lg text-muted-foreground w-full max-w-[500px] mx-auto leading-relaxed">
            Découvrez les retours de nos clients pour nos prestations de detailing, polissage et protection PPF.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="mb-4 break-inside-avoid rounded-xl p-6 bg-card border border-border shadow-sm hover:border-primary transition-colors"
            >
              {/* Quote */}
              <p className="mb-6 font-sans text-sm leading-relaxed text-foreground italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-headline font-bold text-primary bg-muted">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-headline text-sm font-bold text-foreground uppercase tracking-widest">
                      {testimonial.author}
                    </span>
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <span className="font-label text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    {testimonial.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
