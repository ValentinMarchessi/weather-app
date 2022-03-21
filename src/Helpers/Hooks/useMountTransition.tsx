import { useEffect, useState } from "react";

export default function useMountTransition(isMounted: boolean, unmountDelay: number) {
    const [hasTransitionedIn, setHasTrainsitionedIn] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isMounted && !hasTransitionedIn) {
            setHasTrainsitionedIn(true);
        }
        if (!isMounted && hasTransitionedIn) {
            timeoutId = setTimeout(() => setHasTrainsitionedIn(false), unmountDelay);
        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, [isMounted, hasTransitionedIn, unmountDelay])
    
    return hasTransitionedIn;
}