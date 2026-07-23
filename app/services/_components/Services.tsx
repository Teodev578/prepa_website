"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const BEZIER = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Services() {
  const titleLines = ["NOS", "PRESTATIONS."];

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
      <div className="absolute inset-0 pointer-events-none bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 relative z-10 w-full">
        {/* En-tête de page */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: BEZIER }}
          className="mb-16 md:mb-24 pb-8 border-b border-border/60"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Retour à l'accueil</span>
            </Link>
            
            <div className="flex flex-col items-end gap-1 font-mono text-[10px] text-muted-foreground uppercase tracking-widest select-none">
              <span className="text-primary font-bold">OFFRES B2B</span>
              <span>ÎLE-DE-FRANCE</span>
            </div>
          </div>

          <h1 className="text-display font-sans text-foreground">
            {titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden relative pb-2 -mb-2">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: BEZIER }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium"
          >
            Découvrez nos solutions conçues sur-mesure pour les professionnels de l'automobile. De la préparation unitaire au contrat cadre d'externalisation.
          </motion.p>
        </motion.div>

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
            
            <div className="flex-grow z-10">
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-4 font-bold">// VN & VO</span>
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
            
            <div className="flex-grow z-10">
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-4 font-bold">// LOGISTIQUE SÉCURISÉE</span>
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
            
            <div className="flex-grow z-10">
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest block mb-4 font-bold">// CHARGES FIXES → VARIABLES</span>
              <h2 className="text-2xl font-bold mb-4 tracking-tight text-background">EXTERNALISATION PÔLE PRÉPARATION</h2>
              <p className="text-background/80 font-medium mb-8 leading-relaxed text-sm">
                Gestion externalisée de votre pôle esthétique et logistique. Transformez vos charges fixes liées à la préparation en coûts 100% variables.
              </p>
              <ul className="space-y-3 font-sans text-sm text-background/70 mb-12">
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Aucun coût salarial fixe</li>
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Gestion des pics d'activité</li>
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
            
            <div className="flex-grow z-10">
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-4 font-bold">// VALORISATION VO</span>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">RÉNOVATION & DETAILING PARC</h2>
              <p className="text-muted-foreground font-medium mb-8 leading-relaxed text-sm">
                Remise en état complète de véhicules d'occasion pour maximiser la valeur de revente et accélérer la rotation de votre parc.
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
          <Link href="/contact" className="btn-primary inline-flex items-center justify-center w-full md:w-auto md:min-w-[300px] gap-3 mx-auto">
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