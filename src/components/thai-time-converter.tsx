"use client";

import { useState } from "react";
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
import { convertToThaiTime } from "@/lib/time";

export default function ThaiTimeConverter() {
    const [inputTime, setInputTime] = useState("");
    const [thaiTime, setThaiTime] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (am|pm)$/i;
        if (timeRegex.test(inputTime)) {
            setThaiTime(convertToThaiTime(inputTime));
            setError("");
        } else {
            setError("Please enter a valid time");
            setThaiTime("");
        }
    };

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>Thai Time Converter</CardTitle>
                <CardDescription>
                    Enter a time in English to get the Thai spoken version
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="time-input">Enter time</Label>
                        <Input
                            id="time-input"
                            type="text"
                            placeholder="7:45 pm or 19:45"
                            value={inputTime}
                            onChange={(e) => setInputTime(e.target.value)}
                        />
                    </div>
                    <Button type="submit">Convert</Button>
                </form>
                {error && <p className="mt-2 text-red-500">{error}</p>}
                {thaiTime && (
                    <div className="mt-4">
                        <h3 className="font-semibold">Thai Time:</h3>
                        <p className="text-2xl">{thaiTime}</p>
                        <Button asChild>
                            <a
                                href={`https://translate.google.com.au/?sl=auto&tl=en&text=${thaiTime}&op=translate`}
                                target="_blank"
                            >
                                Translate
                            </a>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
