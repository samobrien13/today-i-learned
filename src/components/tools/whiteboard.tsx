"use client";

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import localforage from "localforage";
import { useWhiteboard } from "@/hooks/use-whiteboard";
import { ToolData } from ".";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Whiteboard({ title }: ToolData) {
    const {
        createPeer,
        connectToPeer,
        offer,
        markdown,
        setMarkdown,
        cursor,
        sendMarkdown,
        sendCursor,
    } = useWhiteboard();

    useEffect(() => {
        localforage.getItem("whiteboard-content").then((value) => {
            if (value) {
                setMarkdown(value as string);
            }
        });
    }, [setMarkdown]);

    const handleMarkdownChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setMarkdown(event.target.value);
        localforage.setItem("whiteboard-content", event.target.value);
        sendMarkdown(event.target.value);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        sendCursor({ x: event.clientX, y: event.clientY });
    };

    return (
        <div className="flex flex-col gap-4" onMouseMove={handleMouseMove}>
            <Heading>{title}</Heading>
            <div className="flex gap-4">
                <Button onClick={createPeer}>Create Shareable Link</Button>
                <Textarea
                    placeholder="Paste link here to connect"
                    onChange={(e) => connectToPeer(e.target.value)}
                />
            </div>
            {offer && (
                <div className="flex flex-col gap-2">
                    <p>Share this link with a friend:</p>
                    <div className="flex gap-2">
                        <Textarea readOnly value={offer} />
                        <Button
                            onClick={() => navigator.clipboard.writeText(offer)}
                        >
                            Copy
                        </Button>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-2 gap-4">
                <Textarea
                    className="h-96 w-full rounded-md border p-4"
                    value={markdown}
                    onChange={handleMarkdownChange}
                />
                <div className="prose relative">
                    <div
                        className="absolute h-4 w-4 rounded-full bg-red-500"
                        style={{ left: cursor.x, top: cursor.y }}
                    />
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export { Whiteboard };
