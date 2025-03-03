"use client";

import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
    children: React.ReactNode;
};

function Providers({ children }: ProvidersProps) {
    const [client] = useState(new QueryClient());

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js");
        }
    }, []);

    return (
        <ViewTransitions>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <QueryClientProvider client={client}>
                    <Toaster />
                    {children}
                </QueryClientProvider>
            </ThemeProvider>
        </ViewTransitions>
    );
}

export default Providers;
