"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { ToolData } from "..";
import dynamic from "next/dynamic";

const Time = dynamic(() => import("./time").then((mod) => mod.Time), {
    ssr: false,
});

function ThaiTimeConverter({ title, description }: ToolData) {
    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Time />
            </CardContent>
        </Card>
    );
}

export { ThaiTimeConverter };
