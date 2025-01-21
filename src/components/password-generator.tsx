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

function PasswordGenerator() {
    const { toast } = useToast();
    const [password, setPassword] = useState("");

    useEffect(() => {
        setPassword(() => generatePassword());
    }, []);

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle
                    style={{
                        viewTransitionName: "password-generator-title",
                    }}
                >
                    Password Generator
                </CardTitle>
                <CardDescription>
                    Get a secure password that works for most websites.
                    Passwords are generated client side and never sent to any
                    server
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row flex-wrap items-center gap-4">
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
            </CardContent>
        </Card>
    );
}

export default PasswordGenerator;
