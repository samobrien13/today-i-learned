"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RUBBER_DUCK } from "@/data/tools";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SendIcon } from "lucide-react";
import Image from "next/image";

type Message = {
    text: string;
    sender: "user" | "bot";
};

const supportResponses = [
    "Did you try turning it off and on again?",
    "Did you delete your node_modules and re-install?",
    "Did you update your environment variables?",
    "Did you try Googling it?",
    "Did you try doing what the error message says?",
    "Did you clear your cache?",
];

function RubberDuck() {
    const [messages, setMessages] = useState<Message[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const message = formData.get("message") as string;

        if (!message) return;

        const newMessages: Message[] = [
            ...messages,
            { text: message, sender: "user" },
        ];

        const randomIndex = Math.floor(Math.random() * supportResponses.length);
        const botResponse = supportResponses[randomIndex];

        setTimeout(() => {
            setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
        }, 500);

        formRef.current?.reset();
        inputRef.current?.blur();
    };

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <Card
            className="mx-auto w-full"
            style={{
                viewTransitionName: `${RUBBER_DUCK.slug}-card`,
            }}
        >
            <CardHeader className="border-b">
                <CardTitle>{RUBBER_DUCK.title}</CardTitle>
                <CardDescription>{RUBBER_DUCK.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div ref={chatRef} className="h-96 flex-1 overflow-y-auto p-4">
                    {messages.length === 0 ? (
                        <div className="mt-4 text-center text-muted-foreground">
                            Ask me any tech question!
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex flex-row items-end gap-2 pb-4 ${
                                    message.sender === "user"
                                        ? "justify-end text-right"
                                        : "justify-start text-left"
                                }`}
                            >
                                {message.sender === "bot" ? (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                                        <Image
                                            src="/images/rubber-duck.png"
                                            alt="Rubber Duck"
                                            width={20}
                                            height={20}
                                            className="inline-block object-contain"
                                            priority
                                        />
                                    </div>
                                ) : null}
                                <div
                                    className={`inline-block px-4 py-2 ${
                                        message.sender === "user"
                                            ? "justify-start rounded-r-lg rounded-tl-lg bg-primary text-primary-foreground"
                                            : "rounded-l-lg rounded-br-lg bg-secondary text-secondary-foreground"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-row gap-4 border-t p-6"
                >
                    <Input
                        ref={inputRef}
                        name="message"
                        type="text"
                        placeholder="Type your message..."
                    />
                    <Button type="submit">
                        <SendIcon size={24} />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export { RubberDuck };
