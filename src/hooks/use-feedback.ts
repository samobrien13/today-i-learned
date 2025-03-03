import { addFeedback, getFeedback } from "@/actions/feedback";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFeedback(slug: string) {
    return useQuery({
        queryKey: ["feedback", slug],
        queryFn: () => getFeedback(slug),
    });
}

export function useAddFeedback(slug: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["feedback", slug],
        mutationFn: (formData: FormData) => addFeedback(formData, slug),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["feedback", slug],
            });
        },
    });
}
