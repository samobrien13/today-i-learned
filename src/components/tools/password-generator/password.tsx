"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { generatePassword } from "@/lib/password";
import { toast } from "sonner";

function Password() {
    const [password, setPassword] = useState(() => generatePassword());

    return (
        <>
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
                        toast("Password copied to clipboard", {
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
        </>
    );
}

export { Password };
