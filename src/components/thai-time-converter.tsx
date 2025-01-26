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
import { THAI_TIME_CONVERTER } from "@/data/tools";
import { ChatGPT, GoogleTranslate } from "@/components/ui/icons";

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
        <Card
            className="mx-auto w-full"
            style={{
                viewTransitionName: `${THAI_TIME_CONVERTER.slug}-card`,
            }}
        >
            <CardHeader>
                <CardTitle>{THAI_TIME_CONVERTER.title}</CardTitle>
                <CardDescription>
                    {THAI_TIME_CONVERTER.description}
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
                        <Button asChild variant="secondary">
                            <a
                                href={`https://translate.google.com.au/?sl=auto&tl=en&text=${thaiTime}&op=translate`}
                                target="_blank"
                            >
                                <GoogleTranslate />
                            </a>
                        </Button>
                        <Button asChild variant="secondary">
                            <a
                                href={`https://chatgpt.com?q=Explain%20${thaiTime}%20in%20English%20based%20on%20the%20Thai%20way%20of%20telling%20time`}
                                target="_blank"
                            >
                                <ChatGPT />
                            </a>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
