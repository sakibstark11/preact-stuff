import { useState, useRef, useCallback } from "react";

export default function useFetchData<DataFetchType>(
    dataFetchFunction: (...args: any[]) => Promise<DataFetchType>
) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataFetchType>(null);
    const [error, setError] = useState<string>(null);
    const abortControllerRef = useRef<AbortController>(null);

    const executeFunction = useCallback(async (...args: any[]) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            const result = await dataFetchFunction(...args, abortControllerRef.current.signal);
            setData(result);
        } catch (err) {
            setData(null);
            setError((err as Error).message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [dataFetchFunction])

    return [executeFunction, loading, data, error] as const;
}
