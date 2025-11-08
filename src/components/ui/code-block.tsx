"use client";

import { Copy, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardDescription } from "./card";
import { BundledLanguage, createHighlighter, ThemeInput } from "shiki";
import { JavaScript, TypeScript } from "./icons";

type CodeBlockProps = {
    language: BundledLanguage;
    filename?: string;
    children: string;
};

const theme: ThemeInput = {
    name: "today-i-learned",
    settings: [
        {
            settings: {
                background: "var(--card-background)",
                foreground: "var(--card-foreground)",
            },
        },
        {
            scope: ["class"],
            settings: {
                foreground: "var(--primary)",
            },
        },
        {
            scope: ["variable", "parameter"],
            settings: {
                foreground: "var(--chart-1)",
            },
        },
        {
            scope: ["string", "regexp", "meta.type"],
            settings: {
                foreground: "var(--chart-2)",
            },
        },
        {
            scope: ["number", "entity"],
            settings: {
                foreground: "var(--chart-3)",
            },
        },
        {
            scope: ["constant"],
            settings: {
                foreground: "var(--chart-4)",
            },
        },
        {
            scope: ["operator", "storage", "keyword"],
            settings: {
                foreground: "var(--chart-5)",
            },
        },
        {
            scope: ["comment", "punctuation"],
            settings: {
                foreground: "var(--muted-foreground)",
            },
        },
    ],
};

// This shouldn't work with await?
const highlighter = await createHighlighter({
    themes: [theme],
    langs: [
        "typescript",
        "javascript",
        "json",
        "bash",
        "shell",
        "css",
        "html",
        "markdown",
    ],
});

function CodeBlock({ language, filename, children }: CodeBlockProps) {
    const code = highlighter.codeToHtml(children, {
        lang: language,
        theme: "today-i-learned",
    });

    function languageToIcon(language: BundledLanguage) {
        switch (language) {
            case "typescript":
                return <TypeScript />;
            case "javascript":
                return <JavaScript />;
            case "json":
                return "json";
            case "bash":
            case "shell":
                return <Terminal />;
            default:
                return language;
        }
    }

    return (
        <Card className="divide-y-border mb-6 divide-y">
            <div className="flex items-center px-4 py-2">
                <CardDescription className="flex flex-1 items-center gap-4 font-mono">
                    <span>{languageToIcon(language)}</span>
                    {filename ? (
                        <span className="text-foreground">{filename}</span>
                    ) : null}
                </CardDescription>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        navigator.clipboard.writeText(children);
                        toast("Code copied to clipboard", {
                            duration: 2000,
                        });
                    }}
                >
                    <Copy />
                </Button>
            </div>
            <div
                className="overflow-y-auto p-4"
                dangerouslySetInnerHTML={{ __html: code }}
            />
        </Card>
    );
}

export { CodeBlock };
