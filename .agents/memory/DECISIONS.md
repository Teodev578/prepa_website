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
