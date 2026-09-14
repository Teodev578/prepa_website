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
* *2026-09-14 (Théo, Sarah / Intégration Marque & Favicon) :*
  - **Identité de marque dans l'onglet navigateur :** Remplacement de l'icône Next.js / Vercel par le logo officiel haute définition de Law Clean Center (`public/logo.png`).
  - **Déclinaison multi-format & multi-résolution :**
    - `app/favicon.ico` et `public/favicon.ico` : Format ICO multi-résolution (16x16, 32x32, 48x48) avec canal alpha.
    - `app/icon.png` : PNG 32x32 pour la convention automatique Next.js App Router.
    - `app/apple-icon.png` : PNG 180x180 pour les écrans tactiles Apple / Safari.
  - **Métadonnées de layout :** Ajout de la clé `icons` dans `export const metadata: Metadata` de `app/layout.tsx`.
  - **Titre d'onglet simplifié :** Ajustement de `metadata.title.default` et `metadata.title.template` à `LAW CLEAN CENTER` pour un affichage épuré dans l'onglet du navigateur sans le descriptif rallongé.
  - **Validation :** `npm run check` validé (0 erreur, 0 warning), balise `<title>LAW CLEAN CENTER</title>` vérifiée dans le HTML servi.




