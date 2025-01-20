import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "next-themes";

type ProvidersProps = {
    children: React.ReactNode;
};

function Providers({ children }: ProvidersProps) {
    return (
        <ViewTransitions>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </ViewTransitions>
    );
}

export default Providers;
