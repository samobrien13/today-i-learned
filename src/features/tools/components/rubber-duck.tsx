"use client";

import { SubmitEventHandler, useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import Image from "next/image";
import { ToolData } from ".";
import { useMessages, useSendMessage } from "../hooks/use-messages";

function RubberDuck({ title, description }: ToolData) {
    const formRef = useRef<HTMLFormElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { data: messages, isPending, isError } = useMessages();
    const sendMessageMutation = useSendMessage();

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const message = formData.get("message") as string;

        if (!message) return;

        sendMessageMutation.mutate({ sender: "user", text: message });

        formRef.current?.reset();
    };

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (isError) {
        throw new Error("Failed to get messages");
    }

    return (
        <Card className="mx-auto w-full">
            <CardHeader className="border-b">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent
                ref={chatRef}
                className="h-96 overflow-y-auto border-b"
            >
                {messages.length === 0 ? (
                    <div className="text-muted-foreground text-center">
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
                                <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-full">
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
                                        ? "bg-primary text-primary-foreground justify-start rounded-tl-lg rounded-r-lg"
                                        : "bg-secondary text-secondary-foreground rounded-l-lg rounded-br-lg"
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
            <CardFooter>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-row gap-4"
                >
                    <Input
                        ref={inputRef}
                        name="message"
                        type="text"
                        placeholder="Type your message..."
                        autoFocus
                    />
                    <Button type="submit">
                        <SendIcon size={24} />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}

export { RubberDuck };
