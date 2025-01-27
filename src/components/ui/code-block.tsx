"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardDescription } from "./card";
import SyntaxHighlighter from "react-syntax-highlighter";

type CodeBlockProps = {
    language: string;
    children: string;
};

const theme = {
    "hljs-built_in": {
        color: "hsl(var(--chart-1))",
    },
    "hljs-string": {
        color: "hsl(var(--chart-2))",
    },
    "hljs-variable": {
        color: "hsl(var(--chart-3))",
    },
    "hljs-comment": {
        color: "hsl(var(--muted-foreground))",
    },
} as const;

function CodeBlock({ language, children }: CodeBlockProps) {
    const { toast } = useToast();

    return (
        <Card className="divide-y-border mb-6 divide-y">
            <div className="flex items-center px-4 py-2">
                <CardDescription className="flex-1 font-mono">
                    {language}
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
                    backgroundColor: "hsl(var(--card))",
                    color: "hsl(var(--card-foreground))",
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
