"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

        {/* Grille de services */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Service 1 */}
          <motion.article variants={cardVariants} className="group flex flex-col justify-between bg-card border border-border p-8 md:p-10 rounded-[var(--radius)] hover:border-primary/50 transition-colors">
            <div>
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-4 font-bold">// VN & VO</span>
              <h2 className="text-card-title mb-6">PRÉPARATION ESTHÉTIQUE B2B</h2>
              <p className="text-muted-foreground font-medium mb-8 leading-relaxed">
                Nettoyage technique VN/VO, detailing intérieur/extérieur et rénovation de véhicules pour concessionnaires et parcs automobiles.
              </p>
              <ul className="space-y-4 font-sans text-sm text-muted-foreground">
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Lavage approfondi et décontamination</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Shampoing des tissus et traitement des cuirs</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Polissage et lustrage (suppression micro-rayures)</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Protections céramiques et cires haut de gamme</li>
              </ul>
            </div>
          </motion.article>

          {/* Service 2 */}
          <motion.article variants={cardVariants} className="group flex flex-col justify-between bg-card border border-border p-8 md:p-10 rounded-[var(--radius)] hover:border-primary/50 transition-colors">
            <div>
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-4 font-bold">// LOGISTIQUE SÉCURISÉE</span>
              <h2 className="text-card-title mb-6">CONVOYAGE DE VÉHICULES</h2>
              <p className="text-muted-foreground font-medium mb-8 leading-relaxed">
                Transport sécurisé et convoyage de flottes automobiles en Île-de-France avec traçabilité complète de la prise en charge à la livraison.
              </p>
              <ul className="space-y-4 font-sans text-sm text-muted-foreground">
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Chauffeurs professionnels certifiés</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Assurance spécifique couvrant la valeur du véhicule</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> États des lieux digitalisés avant/après</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Délais respectés et flexibilité d'intervention</li>
              </ul>
            </div>
          </motion.article>

          {/* Service 3 */}
          <motion.article variants={cardVariants} className="group flex flex-col justify-between bg-foreground text-background border border-foreground p-8 md:p-10 rounded-[var(--radius)] relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-bl-full pointer-events-none" />
            <div>
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest block mb-4 font-bold">// CHARGES FIXES → VARIABLES</span>
              <h2 className="text-card-title mb-6 text-background">EXTERNALISATION PÔLE PRÉPARATION</h2>
              <p className="text-background/80 font-medium mb-8 leading-relaxed">
                Gestion externalisée de votre pôle esthétique et logistique. Transformez vos charges fixes liées à la préparation en coûts 100% variables.
              </p>
              <ul className="space-y-4 font-sans text-sm text-background/70">
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Aucun coût salarial fixe, facturation à l'acte</li>
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Gestion des pics d'activité sans embauche</li>
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Standard de qualité garanti sur chaque véhicule</li>
                <li className="flex gap-3 items-start"><span className="text-secondary mt-1">■</span> Contrats cadres flexibles (urgence, 6 mois, 12 mois)</li>
              </ul>
            </div>
            <div className="mt-10 pt-8 border-t border-background/20">
              <Link href="/contact" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary hover:text-background transition-colors group/link">
                ÉTUDE DE FAISABILITÉ <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.article>

          {/* Service 4 */}
          <motion.article variants={cardVariants} className="group flex flex-col justify-between bg-card border border-border p-8 md:p-10 rounded-[var(--radius)] hover:border-primary/50 transition-colors">
            <div>
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest block mb-4 font-bold">// VALORISATION VO</span>
              <h2 className="text-card-title mb-6">RÉNOVATION & DETAILING PARC</h2>
              <p className="text-muted-foreground font-medium mb-8 leading-relaxed">
                Remise en état complète de véhicules d'occasion pour maximiser la valeur de revente et accélérer la rotation de votre parc.
              </p>
              <ul className="space-y-4 font-sans text-sm text-muted-foreground">
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Rattrapage des défauts critiques carrosserie</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Désinfection totale et suppression des odeurs</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Rénovation des optiques et plastiques ternis</li>
                <li className="flex gap-3 items-start"><span className="text-primary mt-1">■</span> Augmentation du prix de vente (ROI immédiat)</li>
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