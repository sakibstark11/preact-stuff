import { useRef, useEffect } from "react";

export default function useAbortController() {
    const abortControllerRef = useRef<AbortController>(new AbortController());
    useEffect(() => {
        abortControllerRef.current = new AbortController();
        return () => {
            abortControllerRef.current.abort();
        };
    });
    return abortControllerRef.current;
}
