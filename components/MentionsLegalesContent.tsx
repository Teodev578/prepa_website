"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  UserCheck,
  Server,
  Briefcase,
  FileText,
  Globe,
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  Lock,
  Cookie,
  Scale,
  ArrowLeft,
  Mail,
  MapPin,
  FileCheck,
  Printer,
  ChevronRight
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
  { id: "editeur", num: "01", title: "Éditeur du Site", icon: Building2 },
  { id: "directeur", num: "02", title: "Directeur de la publication", icon: UserCheck },
  { id: "hebergeur", num: "03", title: "Hébergeur du Site", icon: Server },
  { id: "activite", num: "04", title: "Activité", icon: Briefcase },
  { id: "cgv", num: "05", title: "Conditions générales & Devis", icon: FileText },
  { id: "acces", num: "06", title: "Accès au Site", icon: Globe },
  { id: "propriete", num: "07", title: "Propriété intellectuelle", icon: ShieldCheck },
  { id: "responsabilite", num: "08", title: "Responsabilité", icon: ShieldAlert },
  { id: "liens", num: "09", title: "Liens hypertextes & framing", icon: ExternalLink },
  { id: "donnees", num: "10", title: "Données personnelles", icon: Lock },
  { id: "cookies", num: "11", title: "Cookies", icon: Cookie },
  { id: "droit", num: "12", title: "Droit applicable & Juridiction", icon: Scale },
];

export default function MentionsLegalesContent() {
  const [activeSection, setActiveSection] = useState<string>("editeur");

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

  const handlePrint = () => {
    window.print();
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
            <span>Informations Légales</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
              [ LCEN COMPLIANT ]
            </span>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded bg-card hover:bg-accent border border-border text-foreground transition-colors"
              title="Imprimer cette page"
            >
              <Printer className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">Imprimer / PDF</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-sans">
          Mentions Légales
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Conformément aux dispositions des articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (dite « LCEN »), il est porté à la connaissance des utilisateurs et visiteurs du site <span className="text-foreground font-semibold">lawcleancenter.com</span> (ci-après « le Site ») les présentes mentions légales.
        </p>
        <p className="mt-2 text-sm text-muted-foreground/80 italic">
          L’utilisation du Site implique l’acceptation pleine et entière des conditions décrites ci-après.
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
          {/* 1. Éditeur du Site */}
          <motion.section
            id="editeur"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80 relative overflow-hidden group hover:border-border transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 01
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  1. Éditeur du Site
                </h2>
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              Le Site <strong className="text-foreground">lawcleancenter.com</strong> est édité par la société :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Raison Sociale</span>
                <span className="text-foreground font-bold text-sm">LAW CLEAN CENTER</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Forme Juridique</span>
                <span className="text-foreground font-bold text-sm">EURL (Entreprise unipersonnelle à responsabilité limitée)</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Capital Social</span>
                <span className="text-foreground font-bold text-sm">300 €</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">SIREN</span>
                <span className="text-foreground font-bold text-sm">922 386 131</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">SIRET (Siège)</span>
                <span className="text-foreground font-bold text-sm">922 386 131 00010</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">R.C.S. Immatriculation</span>
                <span className="text-foreground font-bold text-sm">R.C.S. Pontoise 922 386 131</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">N° TVA Intracommunautaire</span>
                <span className="text-foreground font-bold text-sm">FR 23 922386131</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Courrier Électronique</span>
                <a
                  href="mailto:lawcleancenter@outlook.com"
                  className="text-primary hover:underline font-bold text-sm inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  lawcleancenter@outlook.com
                </a>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-background border border-border/60 flex items-start gap-3 font-mono text-xs">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider block">Siège social / Adresse</span>
                <span className="text-foreground font-bold">2 rue Louise Michel, 95470 Fosses, France</span>
              </div>
            </div>
          </motion.section>

          {/* 2. Directeur de la publication */}
          <motion.section
            id="directeur"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 02
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  2. Directeur de la publication
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Le directeur de la publication du Site est <strong className="text-foreground">M. Dekplokou Late LAWSON</strong>, en sa qualité de gérant.
            </p>
            <div className="mt-4 font-mono text-xs inline-flex items-center gap-2 p-3 rounded-lg bg-background border border-border/60">
              <span className="text-muted-foreground">Contact direct :</span>
              <a href="mailto:lawcleancenter@outlook.com" className="text-primary font-bold hover:underline">
                lawcleancenter@outlook.com
              </a>
            </div>
          </motion.section>

          {/* 3. Hébergeur du Site */}
          <motion.section
            id="hebergeur"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 03
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  3. Hébergeur du Site
                </h2>
              </div>
            </div>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
              Le Site est hébergé par la société <strong className="text-foreground">Vercel Inc.</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Société</span>
                <span className="text-foreground font-bold">Vercel Inc.</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Adresse</span>
                <span className="text-foreground font-bold">440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border/60 flex flex-col gap-1">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Site Web & Contact</span>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold inline-flex items-center gap-1">
                  https://vercel.com <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-muted-foreground text-[10px] mt-1">E-mail: privacy@vercel.com</span>
              </div>
            </div>
          </motion.section>

          {/* 4. Activité */}
          <motion.section
            id="activite"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 04
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  4. Activité
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              <strong className="text-foreground">Law Clean Center</strong> propose, à destination des professionnels (concessionnaires, garages, gestionnaires de flottes) comme des particuliers, des prestations de préparation esthétique de véhicules (nettoyage, remise à neuf, detailing, traitement céramique, préparation VN/VO) ainsi que des prestations de convoyage de véhicules, principalement en région Île-de-France.
            </p>
          </motion.section>

          {/* 5. Conditions générales et devis */}
          <motion.section
            id="cgv"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 05
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  5. Conditions générales et devis
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Les prestations proposées par Law Clean Center font l’objet d’un devis individuel et sont régies par ses conditions générales de vente / de prestation de services (CGV/CGPS). Les informations, photographies et témoignages figurant sur le Site sont fournis à titre indicatif et n’ont pas de valeur contractuelle.
            </p>
          </motion.section>

          {/* 6. Accès au Site */}
          <motion.section
            id="acces"
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
                  6. Accès au Site
                </h2>
              </div>
            </div>
            <div className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                Le Site est accessible gratuitement en tout lieu à tout utilisateur disposant d’un accès à Internet. Tous les frais nécessaires à l’accès aux services (matériel informatique, connexion Internet, etc.) sont à la charge de l’utilisateur.
              </p>
              <p>
                L’éditeur met en œuvre les moyens raisonnables pour assurer un accès de qualité au Site, sans y être tenu à une obligation de résultat. Il ne saurait être tenu responsable de tout dysfonctionnement du réseau ou des serveurs, ou de tout autre événement échappant à son contrôle raisonnable, qui empêcherait ou dégraderait l’accès au Site. L’éditeur se réserve la possibilité d’interrompre, de suspendre ou de modifier sans préavis l’accès à tout ou partie du Site, notamment pour des opérations de maintenance ou de mise à jour.
              </p>
            </div>
          </motion.section>

          {/* 7. Propriété intellectuelle */}
          <motion.section
            id="propriete"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 07
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  7. Propriété intellectuelle
                </h2>
              </div>
            </div>
            <div className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                L’ensemble des éléments composant le Site (structure, textes, logo, photographies, vidéos, images, graphismes, etc.) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de <strong className="text-foreground">Law Clean Center</strong> ou, le cas échéant, de ses partenaires ou ayants droit.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation ou exploitation, totale ou partielle, de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite sans l’autorisation écrite préalable de Law Clean Center, sous peine de constituer une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </div>
          </motion.section>

          {/* 8. Responsabilité */}
          <motion.section
            id="responsabilite"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 08
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  8. Responsabilité
                </h2>
              </div>
            </div>
            <div className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                Les informations diffusées sur le Site sont fournies à titre indicatif. Law Clean Center s’efforce d’en assurer l’exactitude et la mise à jour, mais ne saurait garantir l’absence d’erreurs, d’omissions ou d’inexactitudes, ni la disponibilité permanente du Site. Les réalisations (portfolio) et témoignages présentés le sont à titre illustratif et n’emportent aucun engagement contractuel quant au résultat d’une prestation déterminée, qui fait l’objet d’un devis spécifique.
              </p>
              <p>
                Law Clean Center ne saurait être tenu responsable des dommages directs ou indirects résultant de l’accès ou de l’utilisation du Site.
              </p>
            </div>
          </motion.section>

          {/* 9. Liens hypertextes et framing */}
          <motion.section
            id="liens"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 09
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  9. Liens hypertextes et framing
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Le Site peut contenir des liens vers d’autres sites Internet. Law Clean Center n’exerce aucun contrôle sur ces sites tiers et décline toute responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques en matière de protection des données.
            </p>
          </motion.section>

          {/* 10. Données personnelles */}
          <motion.section
            id="donnees"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 10
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  10. Données personnelles
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Le traitement des données à caractère personal collectées via le Site (notamment via le formulaire de demande de devis) est décrit dans la Politique de confidentialité, conformément au Règlement (UE) 2016/679 (RGPD) et à la loi n° 78-17 du 6 janvier 1978 modifiée.
            </p>
          </motion.section>

          {/* 11. Cookies */}
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
                  ARTICLE 11
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  11. Cookies
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Le Site est susceptible d’utiliser des cookies ou traceurs. Les modalités d’utilisation et les moyens de s’y opposer sont précisés dans la Politique de confidentialité.
            </p>
          </motion.section>

          {/* 12. Droit applicable et juridiction compétente */}
          <motion.section
            id="droit"
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/80"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase block font-semibold">
                  ARTICLE 12
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  12. Droit applicable et juridiction compétente
                </h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut de résolution amiable, les tribunaux français seront seuls compétents, dans les conditions de droit commun.
            </p>
          </motion.section>

          {/* Contact Box Bottom */}
          <motion.div
            variants={itemVariants}
            className="p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Des questions juridiques ou administratives ?
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Notre équipe est à votre disposition pour tout renseignement complémentaire relatif à nos mentions légales.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
            >
              Contactez-nous
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
