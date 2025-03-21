import { getBlogs } from "@/actions/blogs";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import useScrollThreshold from "./use-scroll-threshold";

export function useBlogs(tagsArray: string[]) {
    const query = useInfiniteQuery({
        queryKey: ["blogs", tagsArray],
        queryFn: ({ pageParam }) => getBlogs(tagsArray, pageParam),
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage) => {
            let nextPage: string | undefined = undefined;
            if (lastPage?.next) {
                nextPage = lastPage.next;
            }
            return nextPage;
        },
        initialPageParam: "",
    });

    useScrollThreshold(
        query.fetchNextPage,
        query.hasNextPage,
        query.isFetchingNextPage,
    );

    return {
        ...query,
        blogs: query.data?.pages.flatMap((page) => page.blogs) ?? [],
    };
}
