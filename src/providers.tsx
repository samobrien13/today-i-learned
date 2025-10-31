"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState, ViewTransition } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
    children: React.ReactNode;
};

function Providers({ children }: ProvidersProps) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Avoid refetching data immediately on page load
                        staleTime: 1000 * 60,
                    },
                },
            }),
    );

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js");
        }
    }, []);

    return (
        <ViewTransition>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <QueryClientProvider client={client}>
                    <Toaster />
                    {children}
                </QueryClientProvider>
            </ThemeProvider>
        </ViewTransition>
    );
}

export default Providers;
