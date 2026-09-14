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
| **UI & Motion** | Théo (`motion_ui_engineer`) | Opérationnel | `bmad-brainstorming` (UI), `unlazy` (Solo 4 passes sans placeholders), `bmad-ux`. |
| **Fullstack & API** | Alex (`fullstack_data_engineer`) | Opérationnel | `unlazy` (Solo backend & intégrité), `bmad-build`, `bmad-testarch-atdd`. |
| **Qualité & Gatekeeper** | Sarah (`quality_assurance_engineer`) | Opérationnel | `unlazy` (Audit des gates), `react-doctor`, `bmad-review`, DevTools. *(Interdiction Brainstorming)*. |

---

## 3. Notes de Relais (Handoffs)

* *2026-09-14 (Victor / Architecture) :* 
  - Matrice des compétences arrêtée et documentée (ADR-004).
  - Sarah est confirmée comme seule auditrice des oracles `GATES.md` avec pouvoir de véto.
  - Harnais `npm run check` opérationnel et passant au vert.
* *2026-09-14 (Théo / UI & Impeccable) :*
  - Initialisation formelle du contexte de design Impeccable (`/impeccable init`).
  - Rédaction et validation du document d'autorité produit [PRODUCT.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/PRODUCT.md).
  - Configuration du workflow par défaut en mode `code-first` (`.impeccable/config.json`).
