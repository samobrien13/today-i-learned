"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { generatePassword } from "@/lib/password";
import { useToast } from "@/hooks/use-toast";
import { ToolData } from ".";

function PasswordGenerator({ title, description }: ToolData) {
    const { toast } = useToast();
    const [password, setPassword] = useState("");

    useEffect(() => {
        setPassword(() => generatePassword());
    }, []);

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <CardDescription>
                    I have chosen to make 16 character passwords with letters
                    (uppercase and lowercase), numbers and a single symbol
                    (chosen from a small group of nice special characters). This
                    is super secure and should satisfy the requirements of most
                    websites, though you&apos;ll still get the odd website that
                    limits you to 12 characters or doesn&apos;t allow special
                    characters or something else ridiculous.
                </CardDescription>
                <CardDescription>
                    Passwords are generated client side and never sent to any
                    server.
                </CardDescription>
                <div className="flex flex-row flex-wrap items-center gap-4">
                    <p className="font-mono text-lg">
                        {password.length > 0 ? (
                            password
                        ) : (
                            <>Generating...&nbsp;&nbsp;&nbsp;</>
                        )}
                    </p>
                    <div className="flex flex-row gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                navigator.clipboard.writeText(password);
                                toast({
                                    title: "Password copied to clipboard",
                                    duration: 2000,
                                });
                            }}
                        >
                            <Copy />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setPassword(generatePassword());
                            }}
                        >
                            <RefreshCw />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export { PasswordGenerator };
