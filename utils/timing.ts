import { useCallback, useEffect, useState } from 'react';
import {
  QueryFunction,
  QueryKey,
  QueryObserverOptions,
  QueryObserverResult,
  useQuery
} from 'react-query';
import { useDebouncedCallback } from 'use-debounce';

/** useQuery from react-query except the internal query state is debounced, delaying execution */
export const useDebouncedQuery = <TResult, TError>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TResult>,
  queryOptions?: QueryObserverOptions<TResult, TError> | undefined,
  delayMs = 500
): QueryObserverResult<TResult, TError> & {
  debouncedQueryState: {
    key: QueryKey;
    fn: QueryFunction<TResult>;
    enabled: boolean;
  };
} => {
  const enabled = !!(queryOptions && queryOptions.enabled !== undefined
    ? queryOptions.enabled
    : true);

  const [debouncedQueryState, setDebouncedQueryState] = useState({
    key: queryKey,
    fn: queryFn,
    enabled
  });
  const updateQueryDebounced = useDebouncedCallback(
    useCallback(
      (newQueryKey: QueryKey, newQueryFn: QueryFunction<TResult>, newEnabled: boolean) =>
        setDebouncedQueryState({
          key: newQueryKey,
          fn: newQueryFn,
          enabled: newEnabled
        }),
      []
    ),
    delayMs
  );

  // Only update the query state after a debounce, and cancel if anything changes in the interim
  useEffect(() => {
    updateQueryDebounced(queryKey, queryFn, enabled);

    return () => updateQueryDebounced.cancel();
  }, [queryKey, queryFn, enabled, updateQueryDebounced]);

  const queryResults = useQuery(debouncedQueryState.key, debouncedQueryState.fn, {
    ...queryOptions,
    enabled: enabled && debouncedQueryState.enabled // Require undebounced enabled to allow immediate disabling but debounced enabling
  });
  return {
    ...queryResults,
    debouncedQueryState
  };
};
