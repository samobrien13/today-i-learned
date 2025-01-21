"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

export default function ThaiTimeConverter() {
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
                <CardTitle
                    style={{
                        viewTransitionName: "thai-time-converter-title",
                    }}
                >
                    Thai Time Converter
                </CardTitle>
                <CardDescription>
                    Enter a time to get the spoken Thai version
                </CardDescription>
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
                        <p className="flex-1 whitespace-pre-line text-3xl">
                            {thaiTime}
                        </p>
                    )}
                    <div className="flex flex-col gap-2">
                        <Button asChild variant="outline">
                            <a
                                href={`https://translate.google.com.au/?sl=auto&tl=en&text=${thaiTime}&op=translate`}
                                target="_blank"
                            >
                                <Image
                                    src="/google-translate.svg"
                                    alt="Google Translate"
                                    width={24}
                                    height={24}
                                />
                            </a>
                        </Button>
                        <Button asChild variant="outline">
                            <a
                                href={`https://chatgpt.com?q=Explain%20${thaiTime}%20in%20English%20based%20on%20the%20Thai%20way%20of%20telling%20time`}
                                target="_blank"
                            >
                                <Image
                                    src="/chat-gpt.svg"
                                    alt="ChatGPT"
                                    width={24}
                                    height={24}
                                />
                            </a>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
