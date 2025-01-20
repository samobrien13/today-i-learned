"use client";

import { useState } from "react";
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

function PasswordGenerator() {
    const [password, setPassword] = useState(generatePassword());

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
            <CardContent className="flex flex-row items-center gap-4">
                <p className="font-mono text-lg">{password}</p>
                <div className="flex flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={() => {
                            navigator.clipboard.writeText(password);
                            // TODO: Show a toast message
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
