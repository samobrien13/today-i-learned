"use client";

import { ChangeEvent, useState } from "react";
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
    const [thaiTime, setThaiTime] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const time = parseTime(e.target.value);
        if (time) {
            setThaiTime(convertToThaiTime(time));
            setError("");
        } else {
            setError("Please enter a valid time");
            setThaiTime("");
        }
    };

    return (
        <Card className="mx-auto w-full max-w-lg">
            <CardHeader>
                <CardTitle>Thai Time Converter</CardTitle>
                <CardDescription>
                    Enter a time to get the spoken Thai version
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Label htmlFor="time-input">Time</Label>
                <Input
                    id="time-input"
                    type="text"
                    placeholder="7:45 pm or 19:45"
                    onChange={(e) => onChange(e)}
                />
                {error && <p className="mt-2 text-red-500">{error}</p>}
                {thaiTime && (
                    <div className="flex items-center justify-between gap-2">
                        <p className="whitespace-pre-line text-3xl">
                            {thaiTime}
                        </p>
                        <div className="flex gap-2">
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
                                    href={`https://chatgpt.com?q=Explain%20${thaiTime}in%20English%20based%20on%20the%20Thai%20way%20of%20telling%20time`}
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
                )}
            </CardContent>
        </Card>
    );
}
