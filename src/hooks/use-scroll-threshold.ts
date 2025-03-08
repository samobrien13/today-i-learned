import { useEffect } from "react";

function useScrollThreshold(fetchNextPage: () => void, hasNextPage: boolean) {
    useEffect(() => {
        const handleScroll = () => {
            const thresholdPercentage = 0.4;

            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            const distanceFromBottom =
                documentHeight - (windowHeight + scrollY);
            const percentageFromBottom = distanceFromBottom / documentHeight;

            if (percentageFromBottom <= thresholdPercentage && hasNextPage) {
                fetchNextPage();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchNextPage, hasNextPage]);
}

export default useScrollThreshold;
