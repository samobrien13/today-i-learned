"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardDescription } from "./card";
import { BundledLanguage, createHighlighter, ThemeInput } from "shiki";

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
                background: "hsl(var(--card-background))",
                foreground: "hsl(var(--chart-1))",
            },
        },
        {
            scope: "comment",
            settings: {
                foreground: "hsl(var(--muted-foreground))",
            },
        },
        {
            scope: "keyword",
            settings: {
                foreground: "hsl(var(--chart-1))",
            },
        },
        {
            scope: "string",
            settings: {
                foreground: "hsl(var(--chart-2))",
            },
        },
        {
            scope: "number",
            settings: {
                foreground: "hsl(var(--chart-3))",
            },
        },
        {
            scope: "punctuation",
            settings: {
                foreground: "hsl(var(--muted-foreground))",
            },
        },
        {
            scope: "constant",
            settings: {
                foreground: "hsl(var(--chart-4))",
            },
        },
        {
            scope: "variable",
            settings: {
                foreground: "hsl(var(--chart-5))",
            },
        },
        {
            scope: "entity",
            settings: {
                foreground: "hsl(var(--chart-3))",
            },
        },
    ],
};

const highlighter = await createHighlighter({
    themes: [theme],
    langs: ["typescript", "javascript", "json", "bash", "shell", "css", "html"],
});

function CodeBlock({ language, filename, children }: CodeBlockProps) {
    const { toast } = useToast();

    const code = highlighter.codeToHtml(children, {
        lang: language,
        theme: "today-i-learned",
    });

    return (
        <Card className="divide-y-border mb-6 divide-y">
            <div className="flex items-center px-4 py-2">
                <CardDescription className="flex-1 space-x-4 font-mono">
                    <span>{language}</span>
                    {filename ? (
                        <span className="text-foreground">{filename}</span>
                    ) : null}
                </CardDescription>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        navigator.clipboard.writeText(children);
                        toast({
                            title: "Code copied to clipboard",
                            duration: 2000,
                        });
                    }}
                >
                    <Copy />
                </Button>
            </div>
            <div className="p-4" dangerouslySetInnerHTML={{ __html: code }} />
        </Card>
    );
}

export { CodeBlock };
