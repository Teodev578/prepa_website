# État de Session et Mémoire de Travail — prepa_website

Ce document reflète l'état opérationnel courant, les chantiers en cours et les passages de relais (*handoffs*) entre sous-agents.

---

## 1. Contexte Actif

* **Phase actuelle :** Spécialisation des compétences et oracles de vérification Unlazy.
* **Sprint / Objectif :** Intégration de la matrice d'attribution des skills (notamment `unlazy` et `bmad-brainstorming`) au sein des 4 spécialistes de `prepa-team`.
* **Dernière mise à jour :** 2026-09-14

---

## 2. Statut des Composants Clés

| Domaine | Responsable désigné | Statut | Note de relais & Toolkit |
| :--- | :--- | :--- | :--- |
| **Architecture & Mémoire** | Victor (`lead_architect`) | Opérationnel | `bmad-brainstorming`, `unlazy` (Depth Tree), suite BMAD Architecture. |
| **UI & Motion** | Théo (`motion_ui_engineer`) | Opérationnel | `impeccable`, `bmad-brainstorming` (UI), `bmad-build`, `bmad-ux`, `unlazy` (Solo 4 passes sans placeholders). |
| **Fullstack & API** | Alex (`fullstack_data_engineer`) | Opérationnel | `unlazy` (Solo backend & intégrité), `bmad-build`, `bmad-testarch-atdd`. |
| **Qualité & Gatekeeper** | Sarah (`quality_assurance_engineer`) | Opérationnel | `unlazy` (Audit des gates), `react-doctor`, `bmad-review`, `bmad-code-review`, DevTools. *(Interdiction Brainstorming)*. |

---

## 3. Notes de Relais (Handoffs)

* *2026-09-14 (Victor / Architecture) :* 
  - Matrice des compétences arrêtée et documentée (ADR-004).
  - Sarah est confirmée comme seule auditrice des oracles `GATES.md` avec pouvoir de véto.
  - Harnais `npm run check` opérationnel et passant au vert.
* *2026-09-14 (Théo / UI & Impeccable) :*
  - Initialisation formelle du contexte de design Impeccable (`/impeccable init`) et rédaction de [PRODUCT.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/PRODUCT.md).
  - Rédaction et verrouillage du référentiel [DESIGN.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/DESIGN.md) (Direction "Le Terminal Industriel & Glacier", standard Google Labs) et de son sidecar `.impeccable/design.json` (clôture du point P4).
  - Formalisation de la doctrine des passes bornées (*Bounded Passes*) et de l'exclusivité UI de Théo dans `AGENTS.md` et ADR-005.
* *2026-09-14 (Victor / Audit & Correction .agents/) :*
  - **P2** : Correction du chemin de sortie BMAD dans `.agents/_bmad/custom/config.toml`.
  - **P1** : Forçage de la langue française dans `_bmad/custom/config.toml` et `config.user.toml`.
  - **P3** : Frontmatters YAML des 4 agents synchronisés avec les skills réels.
  - **P4** : [DESIGN.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/DESIGN.md) créé et opérationnel.
  - **P5** : `.impeccable/config.local.json` exclu dans `.gitignore`.
  - `npm run check` ✅ — zéro régression, types et tests au vert.
  - **État général :** Setup `.agents/` intégralement assaini, gouvernance Impeccable opérationnelle.


