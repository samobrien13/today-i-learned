import { getBlogs } from "@/actions/blogs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useBlogs(tagsArray: string[]) {
    return useQuery({
        queryKey: ["blogs", tagsArray, 0],
        queryFn: () => getBlogs(tagsArray, 0),
        placeholderData: keepPreviousData,
    });
}
