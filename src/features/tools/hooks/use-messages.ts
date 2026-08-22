import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type Message = {
    text: string;
    sender: "user" | "bot";
};

export const useMessages = () => {
    return useQuery<Message[]>({
        queryKey: ["rubber-duck"],
        queryFn: () => [],
    });
};

export const useSendMessage = () => {
    const { data } = useMessages();
    const queryClient = useQueryClient();
    const websocketRef = useRef<WebSocket>(null);

    useEffect(() => {
        const websocket = new WebSocket("/api/rubber-duck");

        websocketRef.current = websocket;

        websocket.onopen = () => {
            console.log("connected");
        };
        websocket.onmessage = (event) => {
            console.log(event);
            const newData = JSON.parse(event.data);
            const currentData = queryClient.getQueryData([
                "rubber-duck",
            ]) as Message[];
            queryClient.setQueryData(
                ["rubber-duck"],
                [...currentData, newData],
            );
        };

        return () => {
            websocket.close();
        };
    }, [queryClient]);

    return useMutation({
        mutationKey: ["rubber-duck"],
        mutationFn: async (message: Message) => {
            await queryClient.setQueryData(
                ["rubber-duck"],
                [...(data ? data : []), message],
            );

            websocketRef.current?.send(JSON.stringify(message));

            return null;
        },
    });
};
