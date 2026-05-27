"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ToolData } from "..";
import dynamic from "next/dynamic";

const Password = dynamic(
    () => import("./password").then((mod) => mod.Password),
    { ssr: false },
);

function PasswordGenerator({ title, description }: ToolData) {
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
                    <Password />
                </div>
            </CardContent>
        </Card>
    );
}

export { PasswordGenerator };
