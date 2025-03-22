import { useCallback, useLayoutEffect, useState } from "react";

export function useElementDimensions(
    ref: React.RefObject<HTMLDivElement | null>,
): [
    { width: number; height: number; top: number; left: number },
    VoidFunction,
] {
    const [size, setSize] = useState({ width: 0, height: 0, top: 0, left: 0 });

    const measure = useCallback(() => {
        if (!ref.current) return;

        setSize(ref.current.getBoundingClientRect());
    }, [ref]);

    useLayoutEffect(() => {
        measure();
    }, [measure]);

    return [size, measure];
}
