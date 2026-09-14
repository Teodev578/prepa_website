# Project Facts & Invariants — prepa_website

Ce document constitue la **mémoire factuelle permanente** du projet `prepa_website`. Tous les sous-agents de l'équipe doivent consulter et respecter ces invariants avant toute modification.

---

## 1. Stack Technique & Invariants de Version

* **Framework Web** : Next.js `16.2.3` (App Router strict).
  * *Règle absolue* : Toute utilisation d'API nouvelle ou modifiée doit être vérifiée dans `node_modules/next/dist/docs/`.
* **Runtime & Bibliothèque UI** : React `19.2.4` / React DOM `19.2.4`.
* **Styling & Design System** : Tailwind CSS `v4` (`@tailwindcss/postcss: ^4`, `tailwindcss: ^4`).
* **Animations & Expérience Visuelle** : 
  * Framer Motion (`^12.38.0`)
  * Lenis Smooth Scroll (`^1.3.25`)
  * Lucide React (`^1.16.0`)
* **Backend, Données & Services** :
  * Supabase Client (`@supabase/supabase-js: ^2.105.4`)
  * Supabase SSR (`@supabase/ssr: ^0.10.3`)
  * Envoi d'emails : Resend (`^6.12.3`)
* **Qualité & Diagnostics** :
  * TypeScript `^5` (typage strict sans `any`)
  * ESLint `^9` (`eslint-config-next: 16.2.3`)
  * React Doctor (`react-doctor: ^0.9.1` accessible via `npm run doctor`)

---

## 2. Conventions d'Architecture et Découpage

```text
app/
├── (public)/                 # Pages vitrines publiques (layout avec Lenis + header/footer)
│   ├── contact/
│   └── services/
├── api/                      # Routes API serveur (NextRequest / NextResponse)
│   ├── keepalive/            # Route de monitoring Supabase
│   └── notify/               # Notification / Resend
components/
├── home/                     # Sections spécifiques de la landing page
├── ui/                       # Composants atomiques réutilisables
└── GrainOverlay.tsx, etc.    # Effets graphiques globaux
lib/                          # Utilitaires, clients Supabase, helpers partagés
.agents/                      # Configuration de l'équipe d'agents et mémoire
```

---

## 3. Directives Transverses pour les Agents

1. **Vérification de la mémoire** : Au début d'une session ou d'une tâche, inspecter [.agents/memory/SESSION_STATE.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/SESSION_STATE.md) et [DECISIONS.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/DECISIONS.md).
2. **Gestion de l'état UI** : Séparer rigoureusement les composants serveurs (RSC) par défaut des composants clients marqués `"use client"` (limités aux composants interactifs et animés).
3. **Consignation des choix structurants** : Tout nouvel arbitrage technique doit être consigné sous forme d'ADR dans [DECISIONS.md](file:///home/fabien/Documents/Projets/Pro/prepa_website/.agents/memory/DECISIONS.md).
