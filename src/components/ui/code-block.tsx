"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardDescription } from "./card";
import SyntaxHighlighter from "react-syntax-highlighter";

type CodeBlockProps = {
    language: string;
    filename?: string;
    children: string;
};

const theme = {
    "hljs-title": {
        color: "hsl(var(--chart-1))",
    },
    "hljs-built_in": {
        color: "hsl(var(--chart-1))",
    },
    "hljs-string": {
        color: "hsl(var(--chart-2))",
    },
    "hljs-variable": {
        color: "hsl(var(--chart-3))",
    },
    "hljs-attr": {
        color: "hsl(var(--chart-4))",
    },
    "hljs-keyword": {
        color: "hsl(var(--chart-5))",
    },
    "hljs-number": {
        color: "hsl(var(--muted-foreground))",
    },
    "hljs-literal": {
        color: "hsl(var(--muted-foreground))",
    },
    "hljs-function": {
        color: "hsl(var(--muted-foreground))",
    },
    "hljs-comment": {
        color: "hsl(var(--muted-foreground))",
    },
    "hljs-params": {
        color: "hsl(var(--foreground))",
    },
} as const;

function CodeBlock({ language, filename, children }: CodeBlockProps) {
    const { toast } = useToast();

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
            <SyntaxHighlighter
                customStyle={{
                    padding: "1rem 0.5rem",
                    fontSize: "0.875rem",
                    backgroundColor: "hsl(var(--card))",
                    color: "hsl(var(--muted-foreground))",
                    overflowX: "auto",
                }}
                lineNumberStyle={{
                    color: "hsl(var(--muted-foreground))",
                }}
                style={theme}
                language={language}
                showLineNumbers
            >
                {children}
            </SyntaxHighlighter>
        </Card>
    );
}

export { CodeBlock };
