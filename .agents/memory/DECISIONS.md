# Journal des Décisions d'Architecture (ADR) — prepa_website

Ce registre consigne l'historique décisionnel immuable du projet. Chaque arbitrage technique structurant y est enregistré avec son contexte et ses conséquences pour préserver la cohérence entre les interventions des différents sous-agents.

---

## ADR-001 : Mise en place de l'équipe spécialisée et de la mémoire projet

* **Date :** 2026-09-14
* **Statut :** Accepté
* **Contexte :** 
  Le projet accumulait des outils et configurations dispersés (.claude, .continue, .kilo). Il nécessitait une organisation claire, pérenne et modulaire dans `.agents/`, dotée d'une mémoire partagée pour guider les interactions IA.
* **Décision :** 
  Création d'un plugin dédié `prepa-team` regroupant 4 sous-agents spécialisés (Architecte, UI/Motion, Fullstack/Supabase, QA) articulés autour d'un répertoire de mémoire persistant (`.agents/memory/`) et adossés au framework BMAD.
* **Conséquences :** 
  * Tous les sous-agents partagent la même mémoire factuelle (`PROJECT_FACTS.md`) et le journal décisionnel (`DECISIONS.md`).
  * Les artefacts BMAD sont centralisés dans `.agents/_bmad-output/`.

---

## ADR-002 : Préservation stricte de la stack Next.js 16 et React 19

* **Date :** 2026-09-14
* **Statut :** Accepté
* **Contexte :** 
  Les modèles d'IA ont été entraînés majoritairement sur des versions antérieures de Next.js et React. Des risques d'hallucinations d'APIs obsolètes ou supprimées existent.
* **Décision :** 
  Obligation pour tous les agents de consulter `node_modules/next/dist/docs/` avant de modifier le routage, les data-fetchings, les middlewares ou la configuration. Utilisation conjointe du skill `react-doctor` pour certifier la compatibilité React 19.
* **Conséquences :** 
  * Zéro régression liée aux évolutions de syntaxe Next.js App Router.

---

## ADR-003 : Harnais de vérification déterministe et workflow à double vitesse (Dual-Speed)

* **Date :** 2026-09-14
* **Statut :** Accepté
* **Contexte :** 
  L'auto-évaluation du code par les LLMs s'avère insuffisante pour garantir la non-régression. Par ailleurs, imposer le cycle complet BMAD à chaque micro-itération d'UI générait une surcharge administrative nuisible à la vélocité.
* **Décision :** 
  1. Introduction d'un harnais déterministe obligatoire (`npm run check` combinant `tsc --noEmit` et `vitest run`) que tout agent doit faire passer avant clôture de tâche.
  2. Établissement d'une double vitesse d'exécution : *Fast Track* pour les composants et corrections ponctuelles, *BMAD Track* pour les chantiers architecturaux majeurs.
  3. Reconfiguration de Sarah (`quality_assurance_engineer`) en *Review Gatekeeper* indépendante dotée d'un pouvoir de véto.
* **Conséquences :** 
  * Vélocité préservée sur le front-end sans compromettre la rigueur.
  * Zéro régression de type ou de test unitaire admise dans le dépôt.

---

## ADR-004 : Affectation des compétences et protocoles d'usage (`unlazy` & `bmad-brainstorming`)

* **Date :** 2026-09-14
* **Statut :** Accepté
* **Contexte :** 
  Injecter 41 compétences à chaque sous-agent dilue le contexte et crée de la confusion procédurale. En particulier, `unlazy` (anti-bâclage par oracles d'acceptation) et `bmad-brainstorming` (divergence créative) ont des finalités orthogonales qui nécessitent un cadrage par rôle.
* **Décision :** 
  1. `bmad-brainstorming` est restreint aux phases amont et alloué uniquement à Victor (stratégie/macro-architecture) et Théo (design d'interaction). Il est formellement interdit à Sarah pour protéger sa rigueur d'audit.
  2. `unlazy` est alloué à Sarah (contrôle des gates), Alex et Théo (mode solo 4 passes sans placeholders sur tâches substantielles) et Victor (Depth Tree de découpage).
  3. Chaque sous-agent dispose d'une section explicite `## Boîte à Outils & Compétences Dédiées` dans sa définition.
* **Conséquences :** 
  * Focus mental préservé pour chaque spécialiste.
  * Élimination de la complétion fantôme (*phantom completeness*) sur les tâches de production.

---

## ADR-005 : Gouvernance du design system Impeccable et doctrine des passes bornées

* **Date :** 2026-09-14
* **Statut :** Accepté
* **Contexte :** 
  L'initialisation d'Impeccable (`PRODUCT.md`) laissait le projet sans référentiel formel de design tokens (`DESIGN.md`), exposant le front-end à des dérives graphiques (*AI slop*). De plus, l'utilisation non encadrée d'outils d'évaluation esthétique par les LLMs peut entraîner des boucles d'auto-évaluation infinies et une dispersion hors du périmètre UI.
* **Décision :** 
  1. Formalisation et verrouillage du document d'autorité de design [DESIGN.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/DESIGN.md) (Creative North Star "Le Terminal Industriel & Glacier", tokens conformes au spec Google Labs) et de son sidecar `.impeccable/design.json`.
  2. Restriction stricte du skill `impeccable` au périmètre de Théo (`motion_ui_engineer`) pour les composants d'interface. Interdiction formelle aux rôles backend/architecture (Alex, Victor).
  3. Règle des passes bornées (*Bounded Passes*) : toute tâche d'amélioration ou de critique UI est limitée à 2 itérations maximum (audit/critique puis correction par lot), proscrivant les boucles ouvertes de self-QA.
* **Conséquences :** 
  * Source de vérité unique pour les styles, contrastes, polices et formes du site.
  * Clôture définitive du point d'audit P4.
  * Consommation de tokens optimisée et absence de dérive récursive sur le style.

---

## ADR-006 : Stabilisation réactive React 19, intégration ESLint au Gate et optimisation Web Vitals

* **Date :** 2026-09-14
* **Statut :** Accepté
* **Contexte :** 
  L'audit initial a révélé 71 violations ESLint et React Compiler cachées parce que `npm run check` n'exécutait que `tsc` et `vitest`. Par ailleurs, de multiples composants utilisaient des effets asynchrones non synchronisés (`useEffect` avec mutations d'état synchrones ou détection d'écran), déclenchant des cascades de re-renders préjudiciables à la fluidité 60/120 fps. Une ressource de police externe (`Material Symbols Outlined`) bloquait également le FCP/LCP.
* **Décision :** 
  1. **Intégration d'ESLint au Gate déterministe :** Modification de `"check": "npm run lint && npm run typecheck && npm run test"` dans `package.json` afin qu'aucune régression de code ou de pureté React 19 ne puisse franchir la porte d'acceptation.
  2. **Adoption de `useSyncExternalStore` :** Création des hooks mutualisés `useMediaQuery` et `useHydrated` dans `lib/hooks/` pour synchroniser de manière synchrone et sans cascading render les requêtes médias et l'hydratation côté client. Refonte de `ThemeProvider` pour éliminer `setTheme` dans les effets.
  3. **Pattern d'annulation sur les requêtes client :** Sécurisation des fetchs de données dans les composants admin (`PortfolioList`, `QuotesInbox`, `ServicesCatalog`, `FormsConfig`) avec le pattern `isCancelled` et suppression des `setLoading(true)` synchrones dans les effets.
  4. **Optimisation des ressources critiques :** Suppression de la feuille de style Google Fonts externe `Material Symbols Outlined` du layout racine, éliminant les requêtes réseau bloquantes.
  5. **Élimination des `any` résiduels :** Typage strict de l'ensemble des structures de données (`ProjectCardData`, `DbPortfolioProject`, `FormFieldItem`, `NotificationEmail`, `Record<string, unknown>`).
* **Conséquences :** 
  * Zéro erreur, zéro avertissement sur `npx eslint .` (contre 71 précédemment).
  * Exécution intégrale de `npm run check` avec code de sortie 0.
  * Animations et interactions fluides à 60/120 fps garanties sans saccades de layout.
  * Score d'audit et robustesse pérenne pour les évolutions futures.

