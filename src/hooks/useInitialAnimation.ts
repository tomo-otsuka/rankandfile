import { useRef, useState, useEffect } from 'react';

/**
 * Hook to control entrance animations - only animate on first mount.
 * Prevents flashing from re-triggers on state changes.
 * 
 * @param delay - Optional delay before disabling animations (default: 500ms)
 * @returns shouldAnimate - Pass to framer-motion initial prop: initial={shouldAnimate ? {...} : false}
 */
export function useInitialAnimation(delay = 500): boolean {
    const hasAnimatedRef = useRef(false);
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            const timer = setTimeout(() => setShouldAnimate(false), delay);
            return () => clearTimeout(timer);
        }
    }, [delay]);

    return shouldAnimate;
}
