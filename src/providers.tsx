"use client";

import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

type ProvidersProps = {
    children: React.ReactNode;
};

function Providers({ children }: ProvidersProps) {
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
