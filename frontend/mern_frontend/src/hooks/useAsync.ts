import { useCallback, useEffect, useState, DependencyList } from "react";

type UseAsyncReturn<T> = {
  loading: boolean;
  error: unknown;
  value: T | undefined;
};

export default function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies?: DependencyList,
): UseAsyncReturn<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(undefined);
  const [value, setValue] = useState<T | undefined>(undefined);

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);

    asyncFunction()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies ?? []);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
}
