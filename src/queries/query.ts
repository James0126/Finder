/* refetch */
export const RefetchOptions = {
  DEFAULT: /* onMount, onFocus */ {},
  INFINITY: { staleTime: Infinity, retry: false, refetchOnWindowFocus: false },
};
