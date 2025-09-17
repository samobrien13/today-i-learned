"use client";

import ReactMarkdown from "react-markdown";
import localforage from "localforage";
import { useWhiteboard } from "@/hooks/use-whiteboard";
import { ToolData } from ".";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Whiteboard({ title }: ToolData) {
    const {
        peer,
        initiateConnection,
        handleIncomingSignal,
        offer,
        markdown,
        setMarkdown,
        cursor,
        sendMarkdown,
        sendCursor,
        isConnected,
        answer,
    } = useWhiteboard();

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
            {peer ? (
                <Textarea
                    placeholder="Paste answer here to complete connection"
                    onChange={(e) => handleIncomingSignal(e.target.value)}
                />
            ) : (
                <div className="flex gap-4">
                    <Button onClick={() => initiateConnection(true)}>
                        Create Shareable Link
                    </Button>
                    <span>or</span>
                    <Textarea
                        placeholder="Paste offer here to connect"
                        onChange={(e) => {
                            console.log("Offer Textarea onChange fired!");
                            handleIncomingSignal(e.target.value);
                        }}
                    />
                </div>
            )}
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
            {answer && (
                <div className="flex flex-col gap-2">
                    <p>Send this answer back:</p>
                    <div className="flex gap-2">
                        <Textarea readOnly value={answer} />
                        <Button
                            onClick={() =>
                                navigator.clipboard.writeText(answer)
                            }
                        >
                            Copy
                        </Button>
                    </div>
                </div>
            )}
            {isConnected && <p>Connected!</p>} {/* Display connection status */}
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
