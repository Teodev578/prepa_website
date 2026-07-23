---
name: rigueur-code
description: A utiliser pour TOUTE tâche impliquant d'écrire, modifier, corriger, refactorer ou revoir du code, quelle que soit sa taille apparente. Impose une méthode obligatoire en plusieurs étapes (reformulation, plan, vérification des hypothèses, implémentation, auto-revue) afin d'éviter les réponses précipitées, les suppositions non vérifiées sur le code existant, et les erreurs d'inattention. Se déclenche même sur des demandes qui semblent triviales ("juste corriger un bug", "petit changement", "rapide").
---

# Rigueur avant vitesse — méthode obligatoire pour le code

## Pourquoi ce skill existe
Par défaut, l'agent a tendance à foncer : il code sur la base d'une première impression du problème, sans relire le contexte existant, sans vérifier ses hypothèses, et sans se relire. Ce skill impose un frein systématique. La vitesse d'exécution du code n'est jamais un objectif en soi ; la correction et la fiabilité le sont.

## Règle d'or
**Aucune ligne de code n'est écrite avant d'avoir terminé les étapes 1 et 2 ci-dessous.** Une tâche qui semble "évidente" ou "petite" n'est pas une exception — c'est justement là que les suppositions non vérifiées causent le plus de bugs silencieux.

## Processus obligatoire en 5 étapes

### 1. Reformuler et cadrer
- Reformuler explicitement ce qui est demandé, en une ou deux phrases, avant d'agir.
- Identifier ce qui est ambigu ou sous-spécifié. Si un point clé est ambigu et que se tromper coûterait cher (suppression de données, changement d'API publique, logique métier), poser UNE question précise plutôt que de deviner.
- Identifier le périmètre exact : quels fichiers, quelles fonctions, quels effets de bord sont concernés — et surtout ce qui n'est PAS concerné.

### 2. Lire avant d'écrire
- Ouvrir et lire réellement les fichiers concernés (pas seulement ceux mentionnés par l'utilisateur — aussi leurs dépendances directes : imports, appelants, tests existants).
- Ne jamais supposer la signature d'une fonction, le nom d'un champ, ou le comportement d'une librairie : vérifier dans le code source, la documentation, ou par une recherche. Une hypothèse non vérifiée sur une API existante est l'erreur la plus fréquente et la plus coûteuse.
- Repérer les conventions déjà en place (style, gestion d'erreurs, nommage, structure des tests) et les respecter plutôt que d'en introduire de nouvelles.

### 3. Planifier avant d'implémenter
- Écrire un plan court (3 à 7 points) : quels fichiers seront touchés, dans quel ordre, quels cas limites doivent être gérés.
- Lister explicitement les cas limites (entrées vides, valeurs nulles, erreurs réseau, concurrence, permissions) et dire comment chacun est traité.
- Si le plan touche plus de 3 fichiers ou une logique critique (auth, paiement, migration de données), présenter le plan à l'utilisateur avant d'exécuter, sauf instruction contraire explicite.

### 4. Implémenter par petits incréments vérifiables
- Ne jamais produire un gros bloc de changement non vérifié d'un coup. Implémenter, puis vérifier (compilation, exécution, tests) avant de passer au morceau suivant.
- Après chaque changement significatif, relire le diff produit ligne par ligne, comme le ferait un relecteur externe — pas seulement en confirmant que "ça a l'air bon".

### 5. Valider avant de déclarer "terminé"
Avant d'annoncer qu'une tâche est finie, l'agent DOIT :
- Faire tourner les tests existants concernés (et les créer s'ils n'existent pas et que c'est raisonnable).
- Vérifier que le code compile / s'exécute réellement, pas seulement qu'il "semble correct" syntaxiquement.
- Vérifier les cas limites listés à l'étape 3 un par un.
- Vérifier qu'aucun effet de bord non désiré n'a été introduit ailleurs (recherche des appelants d'une fonction modifiée, par exemple).

## Anti-patterns strictement interdits
- Deviner le nom d'une méthode, d'un paramètre ou d'un endpoint sans l'avoir vérifié dans le code ou la doc.
- Modifier un fichier sans l'avoir lu en entier au préalable.
- Dire "c'est fait" sans avoir exécuté ni le code, ni les tests.
- Copier un pattern d'un autre endroit du code sans vérifier qu'il s'applique bien au contexte actuel.
- Répondre à une ambiguïté critique en choisissant arbitrairement une interprétation sans le signaler à l'utilisateur.
- Traiter une demande "rapide" ou "petite" comme une excuse pour sauter les étapes 1 à 3.

## Checklist finale (à valider mentalement avant de répondre)
- [ ] J'ai reformulé la tâche et le périmètre est clair
- [ ] J'ai lu le code existant concerné, pas seulement supposé son contenu
- [ ] J'ai un plan explicite avec les cas limites listés
- [ ] Le code a été exécuté / testé, pas seulement écrit
- [ ] J'ai relu le diff comme un relecteur externe le ferait
- [ ] Aucune hypothèse non vérifiée ne subsiste sur une API, une signature ou un comportement externe

## Exemple d'application
**Demande** : "Corrige rapidement le bug d'affichage du prix dans le panier."

**Mauvaise exécution (précipitée)** : modifier directement la fonction `formatPrice` en supposant que le bug vient d'un arrondi, sans avoir vérifié où `formatPrice` est appelée ni reproduit le bug.

**Bonne exécution (avec ce skill)** :
1. Reformulation : "le prix affiché dans le panier est incorrect — je dois d'abord identifier si c'est un problème de calcul, de formatage, ou de devise."
2. Lecture : ouvrir le composant panier, la fonction de calcul du total, `formatPrice`, et les tests existants.
3. Reproduction du bug avant modification pour confirmer la cause exacte.
4. Plan : corriger uniquement la cause identifiée, lister les cas limites (prix à zéro, devises multiples, remises).
5. Implémentation + exécution des tests + vérification manuelle du cas limite "devise étrangère".
