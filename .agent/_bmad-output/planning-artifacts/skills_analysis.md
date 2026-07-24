# BMAD Planning Artifact: Skills Analysis & Auto-Routing

Ce document définit la cartographie complète des skills disponibles dans `.agent/skills/` et `.agents/skills/` afin de garantir qu'ils soient tous déclenchés automatiquement par l'Orchestrateur Intelligent (`index.md`) selon le contexte.

## 1. Fondation BMAD & Code
- **`rigueur-code`** (BMAD) : Invoqué par défaut pour TOUT changement de code, garantissant le respect de la méthode (reformulation, plan, vérification, implémentation, auto-revue).
- **`implement`** : Pour la phase active de codage de fonctionnalités multi-fichiers.
- **`review`** / **`troubleshoot`** : Pour le débogage et la relecture.
- **`refactoring-specialist`** / **`cleanup`** : Pour la maintenance et l'optimisation.

## 2. Interface Utilisateur & Design (Auto-détection CSS/UI)
- **`ui-ux-pro-max`** : Activé automatiquement pour tout aspect visuel, conception de composants, et palettes.
- **`ui-designer`** / **`ui-ux-designer`** : Pour les détails d'interface spécifiques.
- **`frontend-developer`** / **`vue-expert`** : Invoqué pour les composants React/Next.js/Vue.

## 3. Base de données & Architecture (Auto-détection SQL/Backend)
- **`sql-pro`** : Activé pour les requêtes, schémas, et migrations (ex: Supabase, Prisma, SQL).
- **`backend-developer`** / **`api-designer`** : Pour les routes API, les webhooks, et la logique serveur.
- **`microservices-architect`** : Pour l'architecture système.
- **`websocket-engineer`** : Pour le temps réel.

## 4. Sécurité & Tests de Pénétration (Dossier `.agents/`)
- **`performing-web-application-penetration-test`** : Auto-activé pour toute requête liée à la sécurité web, l'évaluation OWASP.
- **`exploiting-websocket-vulnerabilities`** : Auto-activé pour la sécurité des WebSockets.
- **`abusing-dpapi-for-credential-access`** / **`analyzing-memory-forensics-with-lime-and-volatility`** : Invoqués en cas d'analyse forensic ou de réponse à incident.

## 5. Spécialistes Langages & Frameworks
- **`nextjs-developer`** : Auto-activé dans les dossiers `app/`, `pages/`, et fichiers serveurs.
- **`typescript-pro`** : Auto-activé pour la validation de types et fichiers `.ts`, `.tsx`.
- **`python-pro`** / **`rust-engineer`** / **`angular-architect`** / **`mobile-developer`** : Activés selon l'extension des fichiers ou la stack mentionnée.

## 6. Opérations & CI/CD
- **`git`** / **`git-workflow-manager`** : Pour les commits et les branches.
- **`finalize`** : Pour clôturer une tâche.
- **`deployment-engineer`** / **`build-engineer`** : Pour l'optimisation et la mise en production.

## 7. Recherche & Documentation
- **`seo-specialist`** : Activé pour le balisage et les requêtes organiques.
- **`document`** / **`documentation-engineer`** : Pour toute requête visant à expliquer ou documenter.
- **`market-researcher`** / **`competitive-analyst`** / **`search-specialist`** / **`data-researcher`** / **`trend-analyst`** : Activés pour l'analyse de marché ou la recherche.

## 8. Multi-Agent & Orchestration avancée
- **`agent-organizer`** / **`multi-agent-coordinator`** / **`task-distributor`** / **`mcp-expert`** / **`context-manager`** / **`prompt-engineer`** : Compétences transversales activées pour distribuer le travail sur des systèmes complexes.

---
**Décision d'orchestration :** Le fichier `index.md` est mis à jour pour englober tous ces signaux afin que Gemini route les demandes vers ces experts sans que l'utilisateur n'ait besoin de les mentionner.
