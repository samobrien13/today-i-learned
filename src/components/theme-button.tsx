"use client";

import { Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function ThemeButton() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Button
            aria-label="Toggle theme"
            variant="outline"
            size="icon"
            onClick={() => {
                if (theme === "light") {
                    setTheme("dark");
                } else if (theme === "dark") {
                    setTheme("system");
                } else {
                    setTheme("light");
                }
            }}
        >
            {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : theme === "dark" ? (
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            ) : (
                <Settings className="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100" />
            )}
        </Button>
    );
}

export { ThemeButton };
