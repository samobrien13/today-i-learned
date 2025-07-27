"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { convertToThaiTime, parseTime } from "@/lib/time";
import { ChatGPT, GoogleTranslate } from "@/components/ui/icons";
import { Link } from "../ui/link";
import { ToolData } from ".";

function ThaiTimeConverter({ title, description }: ToolData) {
    const [time, setTime] = useState("");

    useEffect(() => {
        setTime(() =>
            new Date().toLocaleTimeString("en-AU", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
        );
    }, []);

    const parsedTime = parseTime(time);
    const thaiTime = parsedTime ? convertToThaiTime(parsedTime) : null;

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Label htmlFor="time-input">Time</Label>
                <Input
                    id="time-input"
                    type="time"
                    defaultValue={new Date().toLocaleTimeString("en-AU", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                    onChange={(e) => setTime(e.target.value)}
                />

                <div className="flex flex-wrap justify-end gap-2">
                    {thaiTime && (
                        <p className="flex-1 text-3xl whitespace-pre-line">
                            {thaiTime}
                        </p>
                    )}
                    <div className="flex flex-col gap-2">
                        <Button asChild variant="secondary">
                            <Link
                                href={`https://translate.google.com.au/?sl=auto&tl=en&text=${thaiTime}&op=translate`}
                                external
                            >
                                <GoogleTranslate />
                            </Link>
                        </Button>
                        <Button asChild variant="secondary">
                            <Link
                                href={`https://chatgpt.com?q=Explain%20${thaiTime}%20in%20English%20based%20on%20the%20Thai%20way%20of%20telling%20time`}
                                external
                            >
                                <ChatGPT />
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export { ThaiTimeConverter };
