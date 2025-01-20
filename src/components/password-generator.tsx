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
import { Copy } from "lucide-react";
import { generatePassword } from "@/lib/password";

function PasswordGenerator() {
    const [password, setPassword] = useState("");

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
            <CardContent className="flex flex-col gap-4">
                <Button onClick={() => setPassword(generatePassword())}>
                    Generate Password
                </Button>
                {password ? (
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-lg">{password}</p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                navigator.clipboard.writeText(password);
                                // TODO: Show a toast message
                            }}
                        >
                            <Copy />
                        </Button>
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}

export default PasswordGenerator;
