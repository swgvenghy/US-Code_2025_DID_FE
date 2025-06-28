import { useState, useCallback } from "react";
import { BlogWriteReqType, writeBlog } from "../store/querys/ai";

export function useWriteBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (payloads: BlogWriteReqType) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await writeBlog(payloads);
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(String(err)));
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { writeBlog: execute, isLoading, error };
}
