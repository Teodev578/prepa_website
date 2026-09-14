# Agent Instructions & Guidelines — prepa_website

## 1. Organisation de l'Équipe Spécialisée (`prepa-team`)

Le projet s'appuie sur une équipe de sous-agents dédiés, articulés autour d'un système de mémoire persistante et d'un contrôle qualité indépendant :

* **Victor (`lead_architect`)** : Coordination globale, arbitrages d'architecture, cadrage BMAD, animation de l'idéation (`bmad-brainstorming`) et intégrité de la mémoire.
* **Théo (`motion_ui_engineer`)** : Interface, design system, intégration Tailwind CSS v4, cinématiques Framer Motion/Lenis, idéation UI (`bmad-brainstorming`) et rigueur d'implémentation (`unlazy`).
* **Alex (`fullstack_data_engineer`)** : Routes API, Server Actions, Supabase SSR, schémas de données, intégration Resend, typage strict et discipline d'implémentation (`unlazy`).
* **Sarah (`quality_assurance_engineer`)** : **Review Gatekeeper indépendante**, garante du passage réussi de `npm run check`, de l'audit des portes d'acceptation (`unlazy`), des diagnostics DevTools et de la conformité React 19 (`react-doctor`). *(Interdiction formelle de `bmad-brainstorming`)*.

---

## 2. Règle de Proportionnalité : Workflow à Double Vitesse (*Dual-Speed*)

Pour concilier rigueur architecturale et vélocité de développement, l'équipe applique deux vitesses d'intervention :

1. **Fast Track (Itérations courantes & UI) :**
   * *Périmètre :* Création ou retouche de composants UI, micro-animations, ajustements de style Tailwind, corrections de bogues isolés, endpoints simples.
   * *Protocole :* Traitement direct en coupe verticale (*vertical slice*). Aucune obligation de produire des documents BMAD lourds (PRD, Architecture Spine). Seuls le respect des faits techniques et la validation de fin de tâche s'appliquent.
2. **BMAD Track (Chantiers structurants) :**
   * *Périmètre :* Nouveaux modules complets, refonte du modèle de données Supabase, flux d'authentification ou intégrations tierces majeures.
   * *Protocole :* Cycle formel BMAD via Victor (`bmad-spec` → `bmad-architecture` → `bmad-build`), avec génération d'artefacts dans `.agents/_bmad-output/`.

---

## 3. Matrice des Compétences & Protocoles d'Usage

| Rôle | Compétences Phares | Protocole de Déclenchement |
| :--- | :--- | :--- |
| **Victor** | `bmad-brainstorming`, `unlazy` (Depth Tree), suite BMAD Architecture | Déclenche `bmad-brainstorming` lors des phases amont d'exploration fonctionnelle. Utilise `unlazy` pour décomposer les initiatives en Depth Tree. |
| **Théo** | `bmad-brainstorming` (UI), `unlazy` (Solo 4 passes), `bmad-ux` | Utilise `bmad-brainstorming` pour explorer des partis pris graphiques. Déclenche `unlazy` pour coder des composants complexes sans placeholders. |
| **Alex** | `unlazy` (Solo backend), `bmad-build`, `bmad-testarch-atdd` | Déclenche `unlazy` sur les Server Actions et flux Supabase pour verrouiller la gestion des erreurs et les types. *(Pas de brainstorming)*. |
| **Sarah** | `unlazy` (Audit des gates), `react-doctor`, `bmad-review`, DevTools | Audite les `GATES.md` (`gate-check.mjs --status`). Refuse toute complétion sans oracles validés. *(Interdiction absolue de brainstorming)*. |

---

## 4. Système de Mémoire Partagée (`.agents/memory/`)

Avant toute intervention, l'agent doit consulter les repères de mémoire et consigner ses conclusions :

* **Invariants & Faits Techniques :** [.agents/memory/PROJECT_FACTS.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/PROJECT_FACTS.md) (stack vérifiée, structures de dossiers, règles globales).
* **Historique Décisionnel :** [.agents/memory/DECISIONS.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/DECISIONS.md) (ADR immuables — tout choix structurant doit y être consigné).
* **État Opérationnel Courant :** [.agents/memory/SESSION_STATE.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/SESSION_STATE.md) (avancement des chantiers et relais inter-agents).
* **Log Machine BMAD :** `.agents/memory/.memlog.md` (alimenté via le script `memlog.py`).

---

## 5. Protocole de Clôture Obligatoire (*Close-out Protocol*)

Pour éliminer l'érosion de la mémoire (*Memory Drift*) et garantir l'intégrité du code, **aucune tâche ne peut être déclarée achevée sans respecter cette séquence bloquante** :

1. **Validation déterministe impérative :**
   ```bash
   npm run check
   ```
   Ce script exécute `tsc --noEmit` et la suite de tests Vitest. Le code de sortie DOIT être `0`. En cas d'échec, l'agent doit corriger immédiatement les régressions avant toute soumission.
2. **Homologation Gatekeeper (Sarah) :**
   Vérification des portes `GATES.md` (si mode `unlazy`), absence de régressions React 19 et inspection du diff Git.
3. **Mise à jour de la mémoire vivante :**
   Mettre à jour [.agents/memory/SESSION_STATE.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/SESSION_STATE.md) avec les actions effectuées et le point de reprise pour la prochaine session. Consigner tout choix d'architecture dans [DECISIONS.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/DECISIONS.md).

---

<!-- BEGIN:nextjs-agent-rules -->
## 6. Next.js Strict Versioning Guardrails

This project's Next.js version likely differs from what you learned in training — APIs, conventions, and file structure may have changed, including breaking changes and renamed/removed features.

Before writing or modifying any code touching routing, data fetching, middleware, server/client components, or config files:
1. Check the exact installed version in `package.json` (do not assume "latest").
2. Read the relevant section in `node_modules/next/dist/docs/` for that version. If it's missing or incomplete, say so explicitly rather than falling back on memory.
3. Never use an API, hook, or file convention you haven't confirmed exists in this version's docs or source.
4. If something is marked deprecated or experimental in the docs, do not use it as if it were stable — flag it to the user instead.
<!-- END:nextjs-agent-rules -->
