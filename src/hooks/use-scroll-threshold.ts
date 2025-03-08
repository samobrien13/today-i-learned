import { useEffect } from "react";

function useScrollThreshold(
    fetchNextPage: () => void,
    hasNextPage: boolean,
    isFetchingNextPage: boolean,
) {
    useEffect(() => {
        const handleScroll = () => {
            if (isFetchingNextPage) {
                return;
            }

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
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
}

export default useScrollThreshold;
