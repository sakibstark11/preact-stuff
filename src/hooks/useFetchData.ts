import { useState, useCallback, useRef } from "react";

export default function useFetchData(
    fetchFunction: (...args: any[]) => any | ((...args: any[]) => Promise<any>)
) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchFunctionRef = useRef(fetchFunction);

    const executeFunction = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunctionRef.current(...args);
            setData(result);
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    return { executeFunction, loading, data, error };
}
