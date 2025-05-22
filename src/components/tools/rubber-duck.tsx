"use client";

import {
    unstable_ViewTransition as ViewTransition,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
    "Have you checked whether you are looking in the right environment?",
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
        <ViewTransition name={`${RUBBER_DUCK.slug}-card`}>
            <Card className="mx-auto w-full">
                <CardHeader className="border-b">
                    <CardTitle>{RUBBER_DUCK.title}</CardTitle>
                    <CardDescription>{RUBBER_DUCK.description}</CardDescription>
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
                        />
                        <Button type="submit">
                            <SendIcon size={24} />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </ViewTransition>
    );
}

export { RubberDuck };
