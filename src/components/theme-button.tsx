"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

function ThemeButton() {
    const { resolvedTheme: theme, setTheme } = useTheme();

    return (
        <Button
            aria-label="Toggle theme"
            variant="outline"
            size="icon"
            onClick={() => {
                if (theme === "light") {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
            }}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:hidden dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute hidden h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:block dark:scale-100 dark:rotate-0" />
        </Button>
    );
}

export { ThemeButton };
