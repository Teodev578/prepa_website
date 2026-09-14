# Agent Instructions & Guidelines — prepa_website

## 1. Organisation de l'Équipe Spécialisée (`prepa-team`)

Le projet s'appuie sur une équipe de sous-agents dédiés, modulaires et dotés d'une mémoire persistante commune :

* **Victor (`lead_architect`)** : Coordination globale, arbitrages d'architecture, cadrage BMAD et intégrité de la mémoire.
* **Théo (`motion_ui_engineer`)** : Interface, design system, intégration Tailwind CSS v4, transitions Framer Motion et Lenis Scroll.
* **Alex (`fullstack_data_engineer`)** : Routes API, Server Actions, Supabase SSR, schémas de données, intégration Resend et typage strict.
* **Sarah (`quality_assurance_engineer`)** : Performance navigateur, audit Chrome DevTools MCP, diagnostic React 19 (`react-doctor`).

---

## 2. Système de Mémoire Partagée (`.agents/memory/`)

Avant toute intervention, l'agent doit consulter les repères de mémoire et consigner ses conclusions :

* **Invariants & Faits Techniques :** [.agents/memory/PROJECT_FACTS.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/PROJECT_FACTS.md) (stack vérifiée, structures de dossiers, règles globales).
* **Historique Décisionnel :** [.agents/memory/DECISIONS.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/DECISIONS.md) (ADR immuables — tout choix structurant doit y être consigné).
* **État Opérationnel Courant :** [.agents/memory/SESSION_STATE.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/SESSION_STATE.md) (avancement des chantiers et relais inter-agents).
* **Log Machine BMAD :** `.agents/memory/.memlog.md` (alimenté via le script `memlog.py`).

---

## 3. Cadre Méthodologique BMAD

Utiliser le framework BMAD (*Best Practices, Methodology, and Architecture Documentation*) pour toute tâche de conception, d'architecture ou de planification complexe :
* Génération et mise à jour des artefacts dans `.agents/_bmad-output/`.
* Respecter la boucle de spécification (`bmad-spec`), d'architecture (`bmad-architecture`) et de build (`bmad-build`).

---

<!-- BEGIN:nextjs-agent-rules -->
## 4. Next.js Strict Versioning Guardrails

This project's Next.js version likely differs from what you learned in training — APIs, conventions, and file structure may have changed, including breaking changes and renamed/removed features.

Before writing or modifying any code touching routing, data fetching, middleware, server/client components, or config files:
1. Check the exact installed version in `package.json` (do not assume "latest").
2. Read the relevant section in `node_modules/next/dist/docs/` for that version. If it's missing or incomplete, say so explicitly rather than falling back on memory.
3. Never use an API, hook, or file convention you haven't confirmed exists in this version's docs or source.
4. If something is marked deprecated or experimental in the docs, do not use it as if it were stable — flag it to the user instead.
<!-- END:nextjs-agent-rules -->
