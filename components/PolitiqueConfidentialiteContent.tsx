"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  UserCheck,
  Database,
  Car,
  Target,
  Users,
  Globe,
  Clock,
  ShieldCheck,
  Scale,
  Cookie,
  RefreshCw,
  Mail,
  ArrowLeft,
  Printer,
  ChevronRight,
  FileCheck
} from "lucide-react";

const customEase = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: customEase },
  },
};

const sections = [
  { id: "responsable", num: "01", title: "Responsable du traitement", icon: UserCheck },
  { id: "donnees", num: "02", title: "Données collectées", icon: Database },
  { id: "prestations", num: "03", title: "Données liées aux prestations", icon: Car },
  { id: "finalites", num: "04", title: "Finalités et bases légales", icon: Target },
  { id: "destinataires", num: "05", title: "Destinataires et sous-traitants", icon: Users },
  { id: "transfert", num: "06", title: "Transfert hors UE", icon: Globe },
  { id: "conservation", num: "07", title: "Durée de conservation", icon: Clock },
  { id: "securite", num: "08", title: "Sécurité", icon: ShieldCheck },
  { id: "droits", num: "09", title: "Vos droits", icon: Scale },
  { id: "cookies", num: "10", title: "Cookies", icon: Cookie },
  { id: "modification", num: "11", title: "Modification de la politique", icon: RefreshCw },
  { id: "contact", num: "12", title: "Contact", icon: Mail },
];

export default function PolitiqueConfidentialiteContent() {
  const [activeSection, setActiveSection] = useState<string>("responsable");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: document.getElementById('modal-scroll-container'),
        rootMargin: '-20% 0px -60% 0px',
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };



  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: customEase }}
        className="mb-12 md:mb-16 pb-8 border-b border-border/60"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-wider uppercase">
            <span>Confidentialité</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
              [ RGPD COMPLIANT ]
            </span>

          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
          Politique de Confidentialité
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          La présente politique de confidentialité a pour objet d’informer les utilisateurs du site <span className="text-foreground font-semibold">lawcleancenter.com</span> (ci-après « le Site ») sur la manière dont leurs données à caractère personnel sont collectées et traitées par Law Clean Center, conformément au Règlement (UE) 2016/679 du 27 avril 2016 (« RGPD ») et à la loi n° 78-17 du 6 janvier 1978 modifiée (« Informatique et Libertés »).
        </p>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sticky Table of Contents (Desktop Sidebar) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div className="sticky top-4 space-y-4 p-5 rounded-xl bg-card/60 border border-border backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="font-mono text-xs font-semibold text-primary uppercase tracking-widest">
                SOMMAIRE
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                12 ARTICLES
              </span>
            </div>
            <nav className="flex flex-col gap-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => handleNavClick(e, sec.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                      isActive
                        ? "bg-primary/15 text-primary font-semibold border-l-2 border-primary pl-2.5"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    }`}
                  >
                    <span className="text-[10px] opacity-60 font-bold">{sec.num}</span>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{sec.title}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Legal Articles Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-8 xl:col-span-9 space-y-10"
        >
          {/* 1. Responsable du traitement */}
          <motion.section
            id="responsable"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 relative overflow-hidden group hover:border-border transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 01
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  1. Responsable du traitement
                </h2>
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              Le responsable du traitement des données est : <strong className="text-foreground">LAW CLEAN CENTER</strong>
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <li className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Forme Juridique</span>
                <span className="text-foreground font-bold">EURL au capital de 300 €</span>
              </li>
              <li className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Siège social</span>
                <span className="text-foreground font-bold">2 rue Louise Michel, 95470 Fosses, France</span>
              </li>
              <li className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">SIRET</span>
                <span className="text-foreground font-bold">922 386 131 00010</span>
              </li>
              <li className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Immatriculation</span>
                <span className="text-foreground font-bold">R.C.S. Pontoise 922 386 131</span>
              </li>
              <li className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Représentant</span>
                <span className="text-foreground font-bold">M. Lawson Dekplokou Late (Gérant)</span>
              </li>
              <li className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">E-mail</span>
                <a href="mailto:lawcleancenter@outlook.com" className="text-primary hover:underline font-bold inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  lawcleancenter@outlook.com
                </a>
              </li>
            </ul>
          </motion.section>

          {/* 2. Données collectées */}
          <motion.section
            id="donnees"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 02
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  2. Données collectées
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Law Clean Center ne collecte que les données strictement nécessaires aux finalités décrites ci-dessous. Les données sont principalement recueillies via le formulaire de demande de devis présent sur le Site, ainsi que lors de vos échanges avec l’entreprise.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Selon votre profil (particulier ou professionnel), les données susceptibles d’être collectées sont :
            </p>
            <ul className="list-none space-y-2 mb-4 font-mono text-sm text-foreground">
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Identité</li>
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Coordonnées</li>
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Informations professionnelles</li>
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Informations relatives à votre demande</li>
              <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Données techniques de navigation</li>
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Les champs obligatoires sont signalés dans le formulaire. À défaut de renseignement, Law Clean Center pourrait ne pas être en mesure de traiter votre demande.
            </p>
          </motion.section>

          {/* 3. Données liées aux prestations de préparation et de convoyage */}
          <motion.section
            id="prestations"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 03
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  3. Données liées aux prestations de préparation et de convoyage
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Dans le cadre de l’exécution des prestations (préparation esthétique et convoyage), Law Clean Center est amené à traiter des données complémentaires :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              <li><strong className="text-foreground font-medium">Données relatives au véhicule :</strong> marque, modèle, plaque d’immatriculation, état du véhicule, photographies avant/après prestation ;</li>
              <li><strong className="text-foreground font-medium">Données de prise en charge et de restitution :</strong> lieux, dates et heures, nom de la personne remettant ou réceptionnant le véhicule, état des lieux contradictoire ;</li>
            </ul>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed p-4 bg-primary/5 rounded-lg border border-primary/10">
              Conformément aux recommandations de la CNIL applicables à la géolocalisation de véhicules, les données de localisation issues du convoyage ne sont pas conservées au-delà de deux mois, sauf nécessité de prouver ou d’optimiser une prestation, auquel cas elles peuvent être conservées jusqu’à un an.
            </p>
          </motion.section>

          {/* 4. Finalités et bases légales du traitement */}
          <motion.section
            id="finalites"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 04
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  4. Finalités et bases légales du traitement
                </h2>
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border/60">
                    <th className="p-4 font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">Finalité</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold border-l border-border/60">Base légale</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-foreground font-medium">Traiter et répondre à vos demandes de devis et de contact</td>
                    <td className="p-4 text-muted-foreground border-l border-border/60">Mesures précontractuelles prises à votre demande (art. 6.1.b RGPD)</td>
                  </tr>
                  <tr className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-foreground font-medium">Gérer la relation commerciale, le suivi des prestations et le convoyage</td>
                    <td className="p-4 text-muted-foreground border-l border-border/60">Exécution du contrat (art. 6.1.b RGPD)</td>
                  </tr>
                  <tr className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-foreground font-medium">Assurer la sécurité des véhicules pris en charge</td>
                    <td className="p-4 text-muted-foreground border-l border-border/60">Intérêt légitime (art. 6.1.f RGPD)</td>
                  </tr>
                  <tr className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-foreground font-medium">Assurer le suivi administratif, comptable et de facturation</td>
                    <td className="p-4 text-muted-foreground border-l border-border/60">Obligation légale (art. 6.1.c RGPD)</td>
                  </tr>
                  <tr className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-foreground font-medium">Améliorer le Site et mesurer son audience</td>
                    <td className="p-4 text-muted-foreground border-l border-border/60">Intérêt légitime ou consentement, selon les outils (art. 6.1.a ou 6.1.f RGPD)</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-foreground font-medium">Adresser des communications commerciales (le cas échéant)</td>
                    <td className="p-4 text-muted-foreground border-l border-border/60">Consentement, ou intérêt légitime en relation commerciale existante (art. 6.1.a ou 6.1.f RGPD)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* 5. Destinataires et sous-traitants */}
          <motion.section
            id="destinataires"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 05
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  5. Destinataires et sous-traitants
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Les données sont destinées au personnel habilité de Law Clean Center. Elles peuvent être communiquées, dans la limite de leurs attributions, à :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              <li>les sous-traitants techniques intervenant pour le compte de Law Clean Center (hébergement du Site, outil de formulaire et de messagerie, comptabilité, éventuel outil de suivi de flotte) ;</li>
              <li>le cas échéant, les partenaires intervenant dans la réalisation de la prestation (convoyeurs, sous-traitants de préparation).</li>
            </ul>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Conformément à l’article 28 du RGPD, les sous-traitants traitant des données pour le compte de Law Clean Center sont liés par un contrat (ou des clauses) garantissant un niveau de protection et de sécurité approprié et interdisant toute réutilisation des données à d’autres fins.
            </p>
            <p className="text-foreground font-medium text-sm md:text-base">
              Law Clean Center ne vend ni ne loue vos données personnelles à des tiers et ne les utilise pas à des fins publicitaires sans votre consentement.
            </p>
          </motion.section>

          {/* 6. Transfert de données hors de l'Union européenne */}
          <motion.section
            id="transfert"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 06
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  6. Transfert de données hors de l’Union européenne
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Le Site est hébergé par Vercel Inc., société établie aux États-Unis. À ce titre, certaines données techniques peuvent être transférées en dehors de l’Union européenne.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Ces transferts sont encadrés par des garanties appropriées au sens des articles 44 et suivants du RGPD, notamment l’adhésion au Data Privacy Framework UE–États-Unis et/ou la conclusion de clauses contractuelles types approuvées par la Commission européenne.
            </p>
          </motion.section>

          {/* 7. Durée de conservation */}
          <motion.section
            id="conservation"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 07
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  7. Durée de conservation
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Vos données sont conservées pour une durée n’excédant pas celle nécessaire aux finalités poursuivies :
            </p>
            <ul className="space-y-3 font-mono text-xs md:text-sm">
              <li className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/60">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-foreground font-bold block mb-1">Demandes de devis ou de contact n’aboutissant pas à une relation contractuelle</span>
                  <span className="text-muted-foreground">jusqu’à 6 mois à compter du dernier contact</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/60">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-foreground font-bold block mb-1">Données liées à une relation contractuelle</span>
                  <span className="text-muted-foreground">pendant la durée de la relation, puis archivées conformément aux obligations légales</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/60">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-foreground font-bold block mb-1">Données de prospection commerciale</span>
                  <span className="text-muted-foreground">12 mois à compter du dernier contact de votre part, ou jusqu’au retrait de votre consentement</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/60">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-foreground font-bold block mb-1">Données de géolocalisation de convoyage</span>
                  <span className="text-muted-foreground">2 mois en principe (jusqu’à 1 an en cas de besoin de preuve ou d’optimisation)</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/60">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-foreground font-bold block mb-1">Données de navigation / cookies</span>
                  <span className="text-muted-foreground">voir la section « Cookies »</span>
                </div>
              </li>
            </ul>
          </motion.section>

          {/* 8. Sécurité */}
          <motion.section
            id="securite"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 08
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  8. Sécurité
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Law Clean Center met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre toute perte, altération, divulgation ou accès non autorisé, notamment : transmission chiffrée des données, limitation de l’accès aux seules personnes habilitées, mots de passe et sauvegardes régulières. Ces mesures sont proportionnées aux risques encourus.
            </p>
          </motion.section>

          {/* 9. Vos droits */}
          <motion.section
            id="droits"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 09
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  9. Vos droits
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Conformément à la réglementation applicable, vous disposez des droits suivants sur vos données :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              <li>droit d’accès à vos données ;</li>
              <li>droit de rectification des données inexactes ou incomplètes ;</li>
              <li>droit à la limitation du traitement ;</li>
              <li>droit d’opposition au traitement, notamment à la prospection commerciale ;</li>
              <li>droit de retirer votre consentement à tout moment, lorsque le traitement est fondé sur celui-ci.</li>
            </ul>
            <div className="p-4 rounded-xl bg-background border border-border/60 mb-4 text-sm text-muted-foreground leading-relaxed">
              <p className="mb-2">Pour exercer ces droits, contactez-nous par e-mail ou par courrier postal. Law Clean Center vous répondra dans un délai de 72h.</p>
              <a href="mailto:lawcleancenter@outlook.com" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-primary hover:underline">
                <Mail className="w-4 h-4" /> lawcleancenter@outlook.com
              </a>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission Nationale de l’Informatique et des Libertés (CNIL) : 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 – <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnil.fr</a>.
            </p>
          </motion.section>

          {/* 10. Cookies */}
          <motion.section
            id="cookies"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 10
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  10. Cookies
                </h2>
              </div>
            </div>
            
            <div className="space-y-6 text-muted-foreground text-sm md:text-base leading-relaxed">
              <div>
                <h3 className="text-foreground font-bold mb-2">10.1 Qu’est-ce qu’un cookie ?</h3>
                <p>Un cookie est un petit fichier déposé sur votre terminal lors de la visite d’un site, permettant d’en assurer le fonctionnement ou d’en mesurer la fréquentation.</p>
              </div>
              
              <div>
                <h3 className="text-foreground font-bold mb-2">10.2 Cookies utilisés</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong className="text-foreground font-medium">Cookies strictement nécessaires :</strong> indispensables au fonctionnement du Site, ils ne requièrent pas votre consentement.</li>
                  <li><strong className="text-foreground font-medium">Cookies de mesure d’audience / fonctionnels :</strong> déposés uniquement après recueil de votre consentement.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-foreground font-bold mb-2">10.3 Consentement et gestion</h3>
                <p>
                  Si le Site utilise des cookies autres que strictement nécessaires (mesure d’audience, marketing), un bandeau de consentement doit s’afficher dès la première visite, permettant d’accepter, de refuser ou de paramétrer les cookies de manière aussi simple, et tant que vous n’avez pas fait de choix, aucun traceur non essentiel n’est déposé. Vous pouvez à tout moment modifier vos préférences ou configurer votre navigateur. Le refus de certains cookies peut altérer le fonctionnement du Site.
                </p>
              </div>
            </div>
          </motion.section>

          {/* 11. Modification de la politique */}
          <motion.section
            id="modification"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 11
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  11. Modification de la politique
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Law Clean Center se réserve le droit de modifier la présente politique de confidentialité à tout moment, notamment pour l’adapter aux évolutions légales ou techniques. La version applicable est celle en vigueur lors de votre consultation du Site.
            </p>
          </motion.section>

          {/* 12. Contact */}
          <motion.section
            id="contact"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 12
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  12. Contact
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Pour toute question relative à la présente politique ou au traitement de vos données :
            </p>
            <a href="mailto:lawcleancenter@outlook.com" className="inline-flex items-center gap-2 p-4 rounded-xl bg-background border border-border/60 text-primary hover:text-foreground hover:bg-accent transition-colors font-mono font-bold text-sm">
              <Mail className="w-5 h-5" />
              lawcleancenter@outlook.com
            </a>
          </motion.section>


        </motion.div>
      </div>
    </div>
  );
}
