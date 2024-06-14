import { useCallback, useState, useRef } from "react";

export default function useFetchData<DataFetchType>(
    dataFetchFunction: (...args: any[]) => Promise<DataFetchType>
) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataFetchType>(null);
    const [error, setError] = useState<string>(null);
    const dataFetchFunctionRef = useRef(dataFetchFunction);

    const executeFunction = useCallback(
        async (...args: any[]) => {
            setLoading(true);
            setError(null);
            try {
                const result = await dataFetchFunctionRef.current(...args);
                setData(result);
            } catch (err) {
                setData(null);
                setError((err as Error).message || "An error occurred");
            } finally {
                setLoading(false);
            }
        },
        [dataFetchFunctionRef]
    );

    return [executeFunction, loading, data, error] as const;
}
