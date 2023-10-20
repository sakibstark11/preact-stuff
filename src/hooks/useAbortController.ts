import { useState, useEffect } from "react";

export default function useAbortController() {
    const [controller, setController] = useState<AbortController>(
        new AbortController()
    );

    const getSignal = () => {
        controller.abort();
        const newController = new AbortController();
        setController(newController);
        return newController.signal;
    };

    return getSignal;
}
