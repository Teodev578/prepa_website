---
name: index
description: Orchestrateur intelligent de projet — analyse le contexte et active automatiquement les bons skills au bon moment pour toute tâche de développement.
---

# /index — Orchestrateur Intelligent de Projet

## Purpose

Ce fichier est le point d'entrée principal du projet. Il orchestre l'activation des skills disponibles en fonction du **type de tâche détecté**, de la **phase du projet** et du **contexte technique**. Il garantit que chaque intervention est faite avec le bon expert, au bon moment, selon la bonne méthode.

> **Règle fondamentale** : La méthode **BMAD** (implémentée via le skill `rigueur-code`) est TOUJOURS activée en premier pour toute tâche impliquant du code. Aucune ligne de code n'est écrite sans avoir d'abord suivi le processus obligatoire de BMAD (reformulation → plan → vérification → implémentation → auto-revue).

---

## Activation Map — Quel skill pour quelle situation ?

### 🧱 Phase 0 — Avant de coder (OBLIGATOIRE)

| Situation | Skill à activer |
|-----------|----------------|
| **Toute tâche de code**, même "petite" | `rigueur-code` |
| Idée floue, besoin de structurer la réflexion | `brainstorm` |
| Décision d'architecture ou de stack | `brainstorm` + `nextjs-developer` |
| Besoin de données sur le marché / concurrents | `market-researcher` + `competitive-analyst` |

---

### 🏗️ Phase 1 — Architecture & Conception

| Situation | Skill à activer |
|-----------|----------------|
| Conception d'une nouvelle API ou endpoint | `api-designer` → `rigueur-code` |
| Architecture microservices / backend complexe | `microservices-architect` + `backend-developer` |
| Choix d'une librairie ou pattern Next.js | `nextjs-developer` (lire `node_modules/next/dist/docs/` en premier) |
| Conception de base de données / requêtes SQL | `sql-pro` |
| Design system ou composants UI | `ui-ux-pro-max` → `ui-designer` |

---

### 💻 Phase 2 — Implémentation

| Situation | Skill à activer |
|-----------|----------------|
| Fonctionnalité full-stack (frontend + backend + DB) | `rigueur-code` → `fullstack-developer` |
| Composant React / Next.js / UI | `rigueur-code` → `frontend-developer` + `ui-ux-pro-max` |
| Route API, Server Action, middleware Next.js | `rigueur-code` → `nextjs-developer` → `backend-developer` |
| Types TypeScript, interfaces, generics | `rigueur-code` → `typescript-pro` |
| CLI / scripts utilitaires | `rigueur-code` → `cli-developer` |
| WebSocket / temps réel | `rigueur-code` → `websocket-engineer` |
| Intégration Python / data | `rigueur-code` → `python-pro` |
| Intégration Rust / performance native | `rigueur-code` → `rust-engineer` |
| Feature complexe multi-fichiers | `implement` (avec `rigueur-code` intégré) |

---

### 🎨 Phase 2b — Design & UX

| Situation | Skill à activer |
|-----------|----------------|
| Nouveau design visuel / composant premium | `ui-ux-pro-max` → `ui-designer` |
| Expérience utilisateur / parcours | `ui-ux-designer` |
| SEO technique (balises, sitemap, structured data) | `seo-specialist` |
| Contenu marketing / copy | `content-marketer` |

---

### 🔍 Phase 3 — Revue & Qualité

| Situation | Skill à activer |
|-----------|----------------|
| Revue de code avant merge / PR | `review` |
| Bug inexpliqué, comportement inattendu | `troubleshoot` |
| Refactoring / amélioration de code existant | `rigueur-code` → `refactoring-specialist` |
| Nettoyage d'imports, code mort, fichiers inutiles | `cleanup` |
| Analyse de performance ou sécurité | `review --focus performance` ou `review --focus security` |

---

### 📝 Phase 4 — Documentation

| Situation | Skill à activer |
|-----------|----------------|
| Documentation d'un composant ou d'une fonction | `document` |
| Documentation complète d'un module | `documentation-engineer` |
| Mise à jour du README ou changelog | `document` → `git` |
| Synthèse de connaissances inter-fichiers | `knowledge-synthesizer` |

---

### 🚀 Phase 5 — Finalisation & Déploiement

| Situation | Skill à activer |
|-----------|----------------|
| Lint + types + build + commit + push | `finalize` |
| Commit intelligent (message auto) | `git` |
| Branching, merge, résolution conflits | `git-workflow-manager` |
| Déploiement / CI-CD | `deployment-engineer` |
| Optimisation du build | `build-engineer` |

---

### 🤝 Phase Transverse — Coordination

| Situation | Skill à activer |
|-----------|----------------|
| Tâche complexe nécessitant plusieurs experts | `agent-organizer` → `multi-agent-coordinator` |
| Répartition de travail entre agents | `task-distributor` |
| Maintenance du contexte entre sessions | `context-manager` |
| Recherche approfondie (technos, patterns) | `research-analyst` + `data-researcher` |
| Veille technologique / tendances | `trend-analyst` |

---

## Règles d'Orchestration

### Priorités de déclenchement

1. **`rigueur-code`** — Toujours en premier pour du code. Pas d'exception.
2. **`nextjs-developer`** — Lire `node_modules/next/dist/docs/` avant tout code Next.js. L'API peut avoir changé.
3. **`brainstorm`** — Avant d'implémenter quand la demande est floue ou structurellement importante.
4. **`review`** — Avant tout `finalize`. Aucune mise en production sans relecture.
5. **`finalize`** — Toujours en dernier, après implémentation et review.

### Chaînes de skills recommandées

```
# Nouvelle feature complète
brainstorm → rigueur-code → implement (fullstack-developer) → review → document → finalize

# Bug / correction
rigueur-code → troubleshoot → rigueur-code (fix) → review → git

# Nouveau composant UI
rigueur-code → ui-ux-pro-max → frontend-developer → seo-specialist → review → finalize

# API / endpoint Next.js
rigueur-code → nextjs-developer → api-designer → backend-developer → typescript-pro → review → finalize

# Refactoring
rigueur-code → review → refactoring-specialist → cleanup → typescript-pro → review → finalize
```

---

## Stack Technique de ce Projet

Ce projet est un site **Next.js** (App Router). Les skills suivants sont particulièrement critiques :

- **`nextjs-developer`** : skill principal pour toute route, layout, Server Component, Server Action, middleware
- **`typescript-pro`** : typage strict obligatoire, pas de `any` sans justification
- **`rigueur-code`** : méthode obligatoire, surtout sur les hydration bugs et les edge cases SSR/CSR
- **`seo-specialist`** : metadata API, sitemap, structured data, Core Web Vitals
- **`ui-ux-pro-max`** : design system cohérent et premium

> ⚠️ **Next.js dans ce projet peut avoir des breaking changes par rapport aux training data de l'agent.** Toujours lire `node_modules/next/dist/docs/` avant d'écrire du code Next.js.

---

## Signals d'Auto-Détection

L'agent doit détecter automatiquement le contexte via ces signaux :

| Signal détecté | Skill déclenché |
|---------------|----------------|
| Fichiers `*.tsx`, `*.jsx`, composants | `frontend-developer` |
| Dossier `app/`, `pages/`, `layout.tsx` | `nextjs-developer` |
| `route.ts`, `actions.ts`, middleware | `nextjs-developer` + `backend-developer` |
| Base de données, requêtes, migrations, `*.sql` | `sql-pro` |
| Design, UI, visuel, CSS, couleurs, mise en page | `ui-ux-pro-max` (par défaut) + `ui-designer` + `ui-ux-designer` |
| Fichier de test `*.test.ts` | `review` + `typescript-pro` |
| `package.json`, `tsconfig.json` | `build-engineer` + `typescript-pro` |
| Message de commit, PR, push | `git` ou `finalize` |
| Erreur / bug report | `troubleshoot` |
| Demande de documentation | `document` |
| Demande floue / "idée" | `brainstorm` |
| Sécurité Web & Pentest (OWASP) | `performing-web-application-penetration-test` |
| Sécurité des WebSockets | `exploiting-websocket-vulnerabilities` |
| Récupération d'identifiants (DPAPI) | `abusing-dpapi-for-credential-access` |
| Analyse forensic de la mémoire | `analyzing-memory-forensics-with-lime-and-volatility` |
| Refactoring ou nettoyage de code massif | `refactoring-specialist` + `cleanup` |