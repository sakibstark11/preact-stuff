import { useState, useEffect } from "react";

export default function useAbortController() {
    const [controller, setController] = useState<AbortController>(
        new AbortController()
    );

    useEffect(() => {
        const signal = controller.signal;

        console.warn("signal", signal);
        setController(new AbortController());
        return () => {
            controller.abort();
        };
    });

    return controller.signal;
}
