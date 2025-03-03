import { getLikes, addLike, addDislike } from "@/actions/likes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLikes(slug: string) {
    return useQuery({
        queryKey: ["likes", slug],
        queryFn: () => getLikes(slug),
    });
}

export function useLike(slug: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["likes", slug],
        mutationFn: () => addLike(slug),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["likes", slug],
            });
        },
    });
}

export function useDislike(slug: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["likes", slug],
        mutationFn: () => addDislike(slug),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["likes", slug],
            });
        },
    });
}
