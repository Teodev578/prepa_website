# État de Session et Mémoire de Travail — prepa_website

Ce document reflète l'état opérationnel courant, les chantiers en cours et les passages de relais (*handoffs*) entre sous-agents.

---

## 1. Contexte Actif

* **Phase actuelle :** Stabilisation haute performance, zéro régression React 19 & Next.js 16.
* **Sprint / Objectif :** Assainissement complet du codebase (ESLint, React Compiler, Typescript, Vitest, Web Vitals, 60/120 fps fluidité cinématique).
* **Dernière mise à jour :** 2026-09-14

---

## 2. Statut des Composants Clés

| Domaine | Responsable désigné | Statut | Note de relais & Toolkit |
| :--- | :--- | :--- | :--- |
| **Architecture & Mémoire** | Victor (`lead_architect`) | Opérationnel | `bmad-brainstorming`, `unlazy` (Depth Tree), suite BMAD Architecture. ADR-006 consigné. |
| **UI & Motion** | Théo (`motion_ui_engineer`) | Opérationnel | `impeccable`, `bmad-brainstorming` (UI), `bmad-build`, `bmad-ux`. Hooks `useMediaQuery`/`useHydrated` opérationnels, zéro cascading renders. |
| **Fullstack & API** | Alex (`fullstack_data_engineer`) | Opérationnel | Typage strict sans `any`, fetch avec annulation, SSR/API routes conformes Next.js 16. |
| **Qualité & Gatekeeper** | Sarah (`quality_assurance_engineer`) | Validé (Vert) | `npm run check` certifié (ESLint + tsc + Vitest = 0 erreur). `react-doctor` certifié. |

---

## 3. Notes de Relais (Handoffs)

* *2026-09-14 (Victor, Théo, Alex, Sarah / Chantier Stabilisation Long Terme) :*
  - **Gate déterministe unifié :** `npm run check` englobe désormais `npm run lint`, `npm run typecheck` et `npm run test`.
  - **ESLint & React 19 Compiler :** 71 erreurs/warnings éliminés -> **0 erreur, 0 warning** sur l'ensemble du projet.
  - **Fluidité 60/120 fps & zéro cascading render :** Migration des détections d'écran et d'hydratation vers `useSyncExternalStore` (`useMediaQuery`, `useHydrated`, `ThemeProvider`).
  - **Nettoyage des ressources critiques :** Suppression de la police bloquante Google Fonts `Material Symbols Outlined` du layout racine.
  - **Composants Admin & Portfolio assainis :** Remplacement des tags `<img>` par `next/image`, conversion des `any` en interfaces explicites, pattern d'annulation sur les `useEffect`.
  - **Optimisation Mémoire Dev (Turbopack) :** Configuration de `onDemandEntries` (purge à 15s, buffer limité à 2 pages) dans `next.config.ts` et création de `public/images/grid.svg` pour tarir les 404s en boucle.
  - **Vérifications oracles :**
    - `npm run check` : Code de sortie `0` déterministe.
    - `curl -I http://localhost:3000` : HTTP 200 OK.
    - `curl -I http://localhost:3000/portfolio` : HTTP 200 OK.
    - `curl -I http://localhost:3000/contact` : HTTP 200 OK.
  - **Point de reprise pour prochaine session :** Le site est sur un socle technique stabilisé et certifié conforme. Prêt pour les évolutions de contenu ou nouvelles fonctionnalités sous le protocole à double vitesse.
* *2026-09-14 (Alex, Sarah / Supabase Keep-Alive Automation) :*
  - **Maintien d'activité Supabase Free Tier :** Création du workflow GitHub Actions `.github/workflows/supabase-keepalive.yml` exécuté tous les 3 jours à 04:15 UTC (et déclenchable manuellement via `workflow_dispatch`).
  - **Ciblage PostgREST direct :** Requête HTTP GET authentifiée sur `/rest/v1/portfolio_projects?select=id&limit=1` garantissant une transaction dynamique réelle sans toucher aux quotas Vercel Hobby.
  - **Validation oracles :** Requête API testée et validée (HTTP 200 OK avec payload dynamique). `npm run check` certifié (ESLint + tsc + Vitest = 0 erreur).
* *2026-09-14 (Théo, Sarah / Intégration Marque & Favicon) :*
  - **Identité de marque dans l'onglet navigateur :** Remplacement de l'icône Next.js / Vercel par le logo officiel haute définition de Law Clean Center (`public/logo.png`).
  - **Déclinaison multi-format & multi-résolution :**
    - `app/favicon.ico` et `public/favicon.ico` : Format ICO multi-résolution (16x16, 32x32, 48x48) avec canal alpha.
    - `app/icon.png` : PNG 32x32 pour la convention automatique Next.js App Router.
    - `app/apple-icon.png` : PNG 180x180 pour les écrans tactiles Apple / Safari.
  - **Métadonnées de layout :** Ajout de la clé `icons` dans `export const metadata: Metadata` de `app/layout.tsx`.
  - **Titre d'onglet simplifié :** Ajustement de `metadata.title.default` et `metadata.title.template` à `LAW CLEAN CENTER` pour un affichage épuré dans l'onglet du navigateur sans le descriptif rallongé.
  - **Validation :** `npm run check` validé (0 erreur, 0 warning), balise `<title>LAW CLEAN CENTER</title>` vérifiée dans le HTML servi.
* *2026-09-14 (Théo, Sarah / Résolution des chevauchements typographiques) :*
  - **Interlignage & DA Swiss :** Remplacement des ratios d'interlignage ultra-compressés (`leading-[0.85]` et `leading-[0.95]`) par un ratio d'or compact sans collision (`leading-[1.02]` à `leading-[1.05]`) sur l'ensemble des titres de page (`Hero`, `Portfolio`, `Services`, `Contact`, `Testimonials`, `TechnicalServices`, `ExcellencePhilosophy`).
  - **Résolution des collisions de diacritiques :** Dégagement franc entre `NOS` et `RÉALISATIONS` (`mb-2 sm:mb-3` sur le premier bloc) pour éliminer le chevauchement de l'accent aigu majuscule sur les glyphes de la ligne supérieure.
  - **Composant RevealText fiabilisé :** Découpage par ligne avec gestion native des sauts de ligne `\n`, application d'un padding vertical équilibré (`py-[0.18em] -my-[0.18em]`) pour parer à tout rognage (*clipping*) par `overflow-hidden` sur les accents et apostrophes (`L'`).
  - **Cartes de réalisation (ProjectCard) :** Application explicite de `leading-[1.18]` sur les `h2` multi-lignes pour un confort de lecture irréprochable sur mobile.
  - **Validation :** `npm run check` validé (Code 0 : ESLint, tsc, Vitest). Vérification visuelle multi-viewport (desktop 1440px et mobile 390px/360px) via DevTools.
* *2026-09-14 (Théo, Sarah / Recalibrage Proportions & Cadrage 100% Viewport du Hero) :*
  - **Élimination du débordement de "SANS" :** Échelle typographique harmonisée (`text-[9.5vw] sm:text-[8vw] md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] 2xl:text-[6.5rem]`), supprimant le palier surdimensionné `xl:text-[8rem]` (128px) qui provoquait l'écrasement horizontal de la ligne 2 contre les marges droites.
  - **Cadrage 100% Viewport strict :** Rétablissement de la hauteur utile sous la barre de navigation (`pt-20 pb-8 sm:pt-24 sm:pb-10`), suppression de l'écrasement vertical des boutons CTA sous le pli d'écran.
  - **Mise en valeur du véhicule :** Les 3 lignes de titre occupent désormais ~45-50% de la largeur du conteneur sur desktop, dévoilant élégamment le véhicule DS en arrière-plan sans obstruction visuelle excessive.
  - **Boutons & micro-typographie :** Ajustement des hauteurs et paddings des boutons (`min-h-12 sm:min-h-13 px-6 sm:px-8 py-3 sm:py-3.5`), fluidification du paragraphe descriptif (`text-xs sm:text-sm md:text-base lg:text-lg`).
  - **Élimination du rognage des glyphes d'extrémité (AUTO & SANS) :** Identification du micro-clipping horizontal causé par `tracking-tighter` (-0.05em / -4.4px de letter-spacing négatif). L'élément conteneur `overflow-hidden` tronquait les courbes d'extrémité droite des lettres rondes (`O` de `AUTO`, `S` de `SANS`). Résolu par l'ajout d'une marge de sécurité interne horizontale `px-[0.1em] -mx-[0.1em]` (+8.8px de marge de dégagement) dans `RevealText.tsx`.
  - **Validation :** `npm run check` certifié (Code 0). Rendu validé par capture sur 1280x720 (laptop), 1440x900 (desktop), 1024x768 (tablette paysage), 768x1024 (tablette portrait) et 390x844 (mobile).
