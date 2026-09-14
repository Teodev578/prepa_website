---
name: Law Clean Center
description: Préparation Esthétique & Convoyage B2B Automobile
colors:
  primary: "#1c669b"
  primary-foreground: "#ffffff"
  secondary: "#4f7330"
  secondary-foreground: "#ffffff"
  background: "#ffffff"
  foreground: "#0f212f"
  card: "#DAF0EE"
  card-foreground: "#0f212f"
  muted: "#ebf5f4"
  muted-foreground: "#546a7b"
  border: "#c8d9d7"
  input: "#c8d9d7"
  dark-background: "#111417"
  dark-foreground: "#f7f5f6"
  dark-card: "#181d22"
  dark-card-foreground: "#f2f2f2"
  dark-primary: "#59a8e1"
  dark-secondary: "#95c26d"
  dark-border: "#2a343d"
  dark-muted: "#1c2228"
  dark-muted-foreground: "#a0aab2"
typography:
  display:
    fontFamily: "var(--font-sans), Poppins, sans-serif"
    fontSize: "clamp(3.75rem, 8vw, 10rem)"
    fontWeight: 500
    lineHeight: 0.85
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "var(--font-sans), Poppins, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  title:
    fontFamily: "var(--font-sans), Poppins, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-sans), Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-mono), IBM Plex Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.2em"
rounded:
  sm: "0.125rem"
  md: "0.125rem"
  lg: "0.25rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.sm}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "16px 24px"
  card-technical:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.sm}"
    padding: "24px 32px"
---

# Design System: Law Clean Center

## Overview

**Creative North Star: "Le Terminal Industriel & Glacier" (Swiss Technical Precision)**

L'identité visuelle de Law Clean Center rompt délibérément avec les stéréotypes génériques du detailing automobile (fonds noirs brillants, reflets néons violets ou clichés artificiels de supercars). Elle adopte les codes d'une **ingénierie logistique de haute précision** : typographie suisse structurée, contrastes froids « glacier », composition modulaire en grille et finitions tranchantes.

L'interface est conçue pour des décideurs B2B (directeurs de concessions VN/VO, gestionnaires de flottes). Elle transmet une sensation d'efficacité clinique, de fiabilité contractuelle et de maîtrise industrielle des délais. L'esthétique met en lumière les photographies d'ateliers réels et les données opérationnelles vérifiables, refusant tout ornement superflu.

**Key Characteristics:**
- **Rigueur typographique suisse :** Titres en capitales compactes au poids `medium` (interlignage ultra-serré `0.85–0.95` et tracking négatif) associés à des annotations techniques en police monospace.
- **Teintes glacier et ardoise :** Un fond blanc pur souligné d'aplats glacier (`#DAF0EE`) et d'un texte ardoise profond (`#0f212f`), excluant le noir pur artificiel.
- **Angles industriels tranchants :** Rayon de courbure minimaliste de 2px (`0.125rem`), bannissant les arrondis excessifs typiques des maquettes IA standard.
- **Détails de diagramme technique :** Délimitation par bordures fines (`1px solid var(--border)`), repères en croix (`+`) et typographie verticale.

---

## Colors

La palette chromatique est technique, sobre et tempérée par des accords froids de bleu ardoise et de vert végétal industriel.

### Primary
- **Bleu Technique Industriel** (`#1c669b` / Dark: `#59a8e1`) : Utilisé pour les actions primaires décisives (boutons de contact/devis), les repères d'accentuation technique (`+`), les labels monospace et les indicateurs d'état prioritaires.

### Secondary
- **Vert Validation Opérationnelle** (`#4f7330` / Dark: `#95c26d`) : Réservé aux actions secondaires, aux certifications d'étapes de préparation et aux indicateurs d'audit écologique ou de conformité.

### Neutral
- **Blanc Galerie / Fond Pur** (`#ffffff` / Dark: `#111417`) : Fond principal garantissant une clarté lumineuse maximale.
- **Bleu Ardoise Profond** (`#0f212f` / Dark: `#f7f5f6`) : Texte principal, titres et contrastes majeurs. Offre une profondeur supérieure au noir neutre.
- **Glacier Card & Sections** (`#DAF0EE` / Dark: `#181d22`) : Surface des cartes, des modules techniques et des panneaux de tarification.
- **Muted Glacier** (`#ebf5f4` / Dark: `#1c2228`) : Fonds d'arrière-plan alternés, badges passifs et survols légers.
- **Bleu Gris Technique / Muted Foreground** (`#546a7b` / Dark: `#a0aab2`) : Textes secondaires, métadonnées et labels de contextualisation.
- **Bordure Structurale** (`#c8d9d7` / Dark: `#2a343d`) : Lignes de délimitation de grille, séparateurs de tableaux et contours d'inputs.

### Named Rules
**The Rarity Rule.** La couleur primaire (`#1c669b`) ne couvre jamais plus de 10% de la surface visible d'un écran. Sa rareté confère toute sa force au signal d'action.
**The No-Pure-Black Rule.** Aucun élément textuel ou d'arrière-plan n'utilise `#000000`. La profondeur naît de la nuance ardoise (`#0f212f`).

---

## Typography

**Display & Headline Font:** Poppins (`var(--font-sans)`), weight 500 (Medium).
**Body Font:** Poppins (`var(--font-sans)`), weight 400 & 500.
**Technical Label / Monospace Font:** IBM Plex Mono (`var(--font-mono)`), weight 400 & 500.
**Editorial Accent Font:** Libre Baskerville (`var(--font-serif)`), weight 400 & 700.

**Character:** L'alliance d'un sans-serif géométrique traité avec la rigueur du graphisme suisse (majuscules, graisses mesurées, tracking resserré) et d'un monospace d'ingénierie crée une tension visuelle entre modernité institutionnelle et précision technique.

### Hierarchy
- **Display** (Medium 500, `clamp(3.75rem, 8vw, 10rem)`, leading `0.85`, tracking `-0.04em`, Uppercase) : Accroches massives du Hero et transitions de chapitres.
- **Headline / Section Title** (Medium 500, `clamp(2.25rem, 5vw, 3.75rem)`, leading `0.9`, tracking `-0.03em`, Uppercase) : Titres des sections de présentation de services et méthodologie.
- **Title / Card Title** (Medium 500, `clamp(1.5rem, 3vw, 1.875rem)`, leading `1.1`, tracking `tight`, Uppercase) : En-têtes des cartes d'offres et études de cas.
- **Body** (Regular 400 / Medium 500, `1rem`, leading `1.625`, tracking `normal`) : Paragraphes descriptifs, argumentaires de valeur (largeur conseillée : 60–75ch).
- **Label / Annotation** (Medium 500, `0.75rem`, leading `1.2`, tracking `0.2em`, Uppercase, Monospace) : Numérotations techniques `(01)`, indicateurs d'urgence, badges et métadonnées logistiques.

### Named Rules
**The Medium Uppercase Rule.** Les titres majeurs s'expriment en majuscules avec une graisse `font-medium` (et non `black` ou `extrabold`), préservant l'élégance typographique sans agressivité visuelle.

---

## Layout

L'architecture spatiale s'appuie sur une grille modulaire rigide inspirée des publications techniques d'ingénierie.

- **Conteneur maximal :** `max-w-7xl` centré avec marges latérales fluides (`px-4 sm:px-6 lg:px-8`).
- **Rythme vertical :** Espacements modulaires par paliers stricts (`py-12`, `py-20`, `py-32`).
- **Délimitation apparente :** Utilisation systématique de la classe utilitaire `.border-technical` avec repères angulaires pour encadrer les modules de contenu.
- **Responsive model :** Disposition en pile unicolonne sur mobile (<768px) avec suppression du curseur personnalisé, bascule en grille bi- ou tri-colonnes sur desktop (>1024px).

---

## Elevation & Depth

La profondeur n'est pas simulée par des ombres portées floues et étalées, mais par **étagement tonal** (*Tonal Layering*) et encadrement linéaire.

### Shadow Vocabulary
- **Subtle Technical Glow** (`box-shadow: 0 1px 2px 0 var(--shadow-color)`) : Utilisé sur les boutons primaires et les cartes actives. L'ombre est teintée de bleu (`rgba(28, 102, 155, 0.08)`), jamais grise.
- **Active Elevation** (`box-shadow: 0 4px 6px -1px var(--shadow-color)`) : État de survol des cartes interactives et modales d'engagement.

### Named Rules
**The Tonal Layering Rule.** Les plans de profondeur se superposent : Fond `#ffffff` → Carte `#DAF0EE` → Badge `#ebf5f4` → Action `#1c669b`. Les ombres n'interviennent que comme révélateur dynamique d'interaction.

---

## Shapes

- **Form language :** Angulaire, industriel et contrôlé.
- **Rayon de courbure :** `--radius: 0.125rem` (2px). Les cartes, boutons, champs d'entrée et modales adoptent tous ce rayon tranchant.
- **Repère angulaire (`.tech-corner`) :** Les angles supérieurs gauches des cartes majeures arborent un repère en croix technique (`+`) en police monospace, rappelant les schémas techniques industriels.

---

## Components

### Buttons
- **Shape :** Rayon tranchant 2px (`rounded-(--radius)`).
- **Primary (`.btn-primary`) :** Fond `#1c669b`, texte `#ffffff`, bordure `1px solid #1c669b`, typographie monospace majuscule avec tracking `0.15em`. Survol : inversion en fond `#ffffff` et texte `#1c669b`.
- **Secondary (`.btn-secondary`) :** Fond transparent, texte `#4f7330`, bordure `1px solid #4f7330`. Survol : fond `#4f7330` et texte `#ffffff`.

### Cards / Containers
- **Technical Card :** Fond `#DAF0EE`, bordure `1px solid #c8d9d7`, rayon 2px, padding `p-6 md:p-8`. Peut arborer le repère `.tech-corner`.
- **Stat / Data Card :** Encadrement minimaliste, grand chiffre en Poppins Medium, métadonnée en IBM Plex Mono uppercase.

### Inputs / Fields
- **Champs de formulaire :** Fond `#ffffff`, bordure fine `#c8d9d7`, rayon 2px, typographie sans-serif text-sm.
- **Focus :** Pas de halo diffus : bascule de bordure sur `var(--primary)` avec un léger ring délimité sans décalage.

---

## Do's and Don'ts

### Do:
- **Do** utiliser systématiquement les majuscules avec tracking négatif serré pour les titres d'envergure.
- **Do** privilégier les repères techniques discrets (numérotation entre parenthèses, croix `+`, séparateurs fins) pour asseoir la tonalité B2B.
- **Do** maintenir le rayon de courbure à 2px (`0.125rem`) sur tous les éléments d'interface.
- **Do** utiliser des photographies réelles d'interventions en atelier pour illustrer les prestations.

### Don't:
- **Don't** employer de dégradés multicolores (violet/rose/bleu) typiques des interfaces IA génériques.
- **Don't** utiliser de grands arrondis (`rounded-2xl` ou `rounded-3xl`) incompatibles avec l'esprit industriel de Law Clean Center.
- **Don't** insérer de fausses évaluations avec des étoiles dorées ou de faux avis Google inventés.
- **Don't** surcharger l'écran de micro-animations continues qui perturbent la consultation professionnelle sur mobile ou tablette d'atelier.
