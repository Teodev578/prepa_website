import { useCallback, useSyncExternalStore } from "react";

/**
 * Souscription réactive et hautement performante à une media query via useSyncExternalStore.
 * Élimine les cascading renders et les re-renders synchrones en useEffect sous React 19.
 *
 * @param query La requête média CSS (ex: "(min-width: 1024px)")
 * @param serverFallback Valeur renvoyée lors du rendu serveur (par défaut: true pour du desktop-first, ou false)
 */
export function useMediaQuery(query: string, serverFallback = true): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") {
        return () => {};
      }
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => {
        mql.removeEventListener("change", onStoreChange);
      };
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return serverFallback;
    }
    return window.matchMedia(query).matches;
  }, [query, serverFallback]);

  const getServerSnapshot = useCallback(() => serverFallback, [serverFallback]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
