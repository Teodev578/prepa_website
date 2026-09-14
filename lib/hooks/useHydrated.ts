import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Détecte si le composant est monté/hydraté côté client sans déclencher
 * de mise à jour d'état synchrone dans useEffect (évite react-hooks/set-state-in-effect).
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
