"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const customEase = [0.16, 1, 0.3, 1] as const;

const textRevealVariants = {
    hidden: { y: "100%", opacity: 0 },
    show: {
        y: "0%",
        opacity: 1,
        transition: { duration: 1.2, ease: customEase }
    }
};

const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.2, ease: customEase }
    }
};

const BEZIER = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Services() {
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: BEZIER },
    },
  };

  return (
    <div className="bg-background text-foreground min-h-screen pb-16 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/images/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 relative z-10 w-full">
        {/* En-tête de page */}
        {/* 🛠️ HEADER */}
        <div className="mb-12 sm:mb-16 relative">
            <div className="mb-4 flex items-center gap-3 sm:gap-4">
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1, ease: customEase }}
                    className="w-8 sm:w-12 h-px bg-primary/40 origin-left"
                />
                <span className="text-muted-foreground font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] wrap-break-word">
                    OFFRES B2B
                </span>
            </div>

            <div className="overflow-hidden py-2">
                <motion.h1
                    variants={textRevealVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-50px" }}
                    className="font-black text-[13vw] sm:text-[9vw] md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-foreground leading-[0.85] mb-6 md:mb-8 uppercase tracking-tighter"
                >
                    NOS <br /> 
                    PRESTATIONS <span className="text-foreground inline-block transform translate-y-1 md:translate-y-2 opacity-30"></span>
                </motion.h1>
            </div>

            <div className="overflow-hidden">
                <motion.p
                    variants={paragraphVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-50px" }}
                    className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed border-l-[3px] border-border/50 pl-4 sm:pl-6 mt-4 sm:mt-6"
                >
                    Découvrez nos solutions conçues sur-mesure pour les professionnels de l&apos;automobile. De la préparation unitaire au contrat cadre d&apos;externalisation.
                </motion.p>
            </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y border-border"
        >
          {/* Service 1 */}
          <motion.article variants={cardVariants} className="group flex flex-col border-b md:border-b-0 md:border-r border-border p-8 md:p-10 bg-card hover:bg-muted/10 transition-colors cursor-pointer relative overflow-hidden h-full">
            <div className="flex justify-between items-start mb-8">
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground group-hover:text-primary transition-colors stroke-[1.5]" />
              <span className="text-4xl md:text-5xl font-sans font-light tracking-tighter text-foreground">01.</span>
            </div>
            
            <div className="grow z-10">
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-4 font-bold">{"//"} VN & VO</span>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">PRÉPARATION ESTHÉTIQUE B2B</h2>
              <p className="text-muted-foreground font-medium mb-8 leading-relaxed text-sm">
                Nettoyage technique VN/VO, detailing intérieur/extérieur et rénovation de véhicules pour concessionnaires et parcs automobiles.
              </p>
              <ul className="space-y-3 font-sans text-sm text-muted-foreground mb-12">
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Lavage approfondi et décontamination</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Shampoing des tissus et traitement des cuirs</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Polissage et lustrage</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Protections céramiques</li>
              </ul>
            </div>


          </motion.article>

          {/* Service 2 */}
          <motion.article variants={cardVariants} className="group flex flex-col border-b md:border-b-0 lg:border-r border-border p-8 md:p-10 bg-card hover:bg-muted/10 transition-colors cursor-pointer relative overflow-hidden h-full">
            <div className="flex justify-between items-start mb-8">
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground group-hover:text-primary transition-colors stroke-[1.5]" />
              <span className="text-4xl md:text-5xl font-sans font-light tracking-tighter text-foreground">02.</span>
            </div>
            
            <div className="grow z-10">
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-4 font-bold">{"//"} LOGISTIQUE SÉCURISÉE</span>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">CONVOYAGE DE VÉHICULES</h2>
              <p className="text-muted-foreground font-medium mb-8 leading-relaxed text-sm">
                Transport sécurisé et convoyage de flottes automobiles en Île-de-France avec traçabilité complète de la prise en charge à la livraison.
              </p>
              <ul className="space-y-3 font-sans text-sm text-muted-foreground mb-12">
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Chauffeurs professionnels certifiés</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Assurance valeur du véhicule</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> États des lieux digitalisés</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Délais respectés et flexibilité</li>
              </ul>
            </div>


          </motion.article>

          {/* Service 3 */}
          <motion.article variants={cardVariants} className="group flex flex-col border-b md:border-b-0 lg:border-r border-border p-8 md:p-10 bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer relative overflow-hidden h-full">
            <div className="flex justify-between items-start mb-8">
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-background/50 group-hover:text-secondary transition-colors stroke-[1.5]" />
              <span className="text-4xl md:text-5xl font-sans font-light tracking-tighter text-background">03.</span>
            </div>
            
            <div className="grow z-10">
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest block mb-4 font-bold">{"//"} CHARGES FIXES → VARIABLES</span>
              <h2 className="text-2xl font-bold mb-4 tracking-tight text-background">EXTERNALISATION PÔLE PRÉPARATION</h2>
              <p className="text-background/80 font-medium mb-8 leading-relaxed text-sm">
                Gestion externalisée de votre pôle esthétique et logistique. Transformez vos charges fixes liées à la préparation en coûts 100% variables.
              </p>
              <ul className="space-y-3 font-sans text-sm text-background/70 mb-12">
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Aucun coût salarial fixe</li>
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Gestion des pics d&apos;activité</li>
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Standard de qualité garanti</li>
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Contrats cadres flexibles</li>
              </ul>
            </div>
            

          </motion.article>

          {/* Service 4 */}
          <motion.article variants={cardVariants} className="group flex flex-col p-8 md:p-10 bg-card hover:bg-muted/10 transition-colors cursor-pointer relative overflow-hidden h-full">
            <div className="flex justify-between items-start mb-8">
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground group-hover:text-primary transition-colors stroke-[1.5]" />
              <span className="text-4xl md:text-5xl font-sans font-light tracking-tighter text-foreground">04.</span>
            </div>
            
            <div className="grow z-10">
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-4 font-bold">{"//"} VALORISATION VO</span>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">RÉNOVATION & DETAILING PARC</h2>
              <p className="text-muted-foreground font-medium mb-8 leading-relaxed text-sm">
                Remise en état complète de véhicules d&apos;occasion pour maximiser la valeur de revente et accélérer la rotation de votre parc.
              </p>
              <ul className="space-y-3 font-sans text-sm text-muted-foreground mb-12">
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Rattrapage des défauts carrosserie</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Désinfection totale et odeurs</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Rénovation optiques et plastiques</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Augmentation du prix de vente</li>
              </ul>
            </div>


          </motion.article>

        </motion.div>

        {/* Section Call to action de bas de page */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: BEZIER }}
          className="mt-16 md:mt-24 text-center pb-8"
        >
          <Link href="/contact" className="btn-primary inline-flex items-center justify-center w-full md:w-auto md:min-w-75 gap-3 mx-auto">
            <span>OBTENIR UN DEVIS PERSONNALISÉ</span>
          </Link>
          <p className="mt-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            RÉPONSE SOUS 24H OUVRÉES
          </p>
        </motion.div>
      </div>
    </div>
  );
}