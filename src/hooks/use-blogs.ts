import { getBlogs } from "@/actions/blogs";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import useScrollThreshold from "./use-scroll-threshold";

export function useBlogs(tagsArray: string[]) {

    const query = useInfiniteQuery({
        queryKey: ["blogs", tagsArray],
        queryFn: ({ pageParam }) => getBlogs(tagsArray, pageParam as number),
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage) => {
            let nextPage: number | undefined = undefined;
            if (lastPage?.next) {
                nextPage = lastPage.next;
            }
            return nextPage;
        },
        getPreviousPageParam: (lastPage) => {
            let previousPage: number | undefined = undefined;
            if (lastPage?.previous) {
                previousPage = lastPage.previous;
            }
            return previousPage;
        },
        initialPageParam: 0,
    });

    useScrollThreshold(query.fetchNextPage, query.hasNextPage);

    return {
        ...query,
        blogs: query.data?.pages.flatMap((page) => page.blogs) ?? [],
    };
}
