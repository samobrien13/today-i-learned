"use client";

import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

type ProvidersProps = {
    children: React.ReactNode;
};

function Providers({ children }: ProvidersProps) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js");
        }
    }, []);

    return (
        <ViewTransitions>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Toaster />
                {children}
            </ThemeProvider>
        </ViewTransitions>
    );
}

export default Providers;
