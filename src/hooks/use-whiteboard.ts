import { useState, useEffect } from "react";
import Peer from "simple-peer";

declare global {
    interface Window {
        peer: Peer.Instance;
    }
}

export const useWhiteboard = () => {
    const [peer, setPeer] = useState<Peer.Instance | null>(null);
    const [offer, setOffer] = useState("");
    const [answer, setAnswer] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (peer) {
            if (!window.peer) {
                window.peer = peer;
            }
            peer.on("data", (data) => {
                const message = JSON.parse(data.toString());
                if (message.type === "markdown") {
                    setMarkdown(message.payload);
                } else if (message.type === "cursor") {
                    setCursor(message.payload);
                }
            });

            peer.on("connect", () => {
                setIsConnected(true);
            });

            peer.on("close", () => {
                setIsConnected(false);
                setPeer(null);
            });

            peer.on("error", (err) => {
                console.error("Peer error:", err);
                setIsConnected(false);
            });
        }

        return () => {
            if (peer) {
                peer.destroy();
            }
        };
    }, [peer]);

    const initiateConnection = (isInitiator: boolean) => {
        const newPeer = new Peer({ initiator: isInitiator, trickle: false });

        newPeer.on("signal", (data) => {
            if (isInitiator) {
                setOffer(JSON.stringify(data));
            } else {
                setAnswer(JSON.stringify(data));
            }
        });

        setPeer(newPeer);
        return newPeer;
    };

    const handleIncomingSignal = (incomingSignal: string) => {
        if (!peer) {
            const newPeer = initiateConnection(false);
            newPeer.signal(JSON.parse(incomingSignal));
        } else {
            peer.signal(JSON.parse(incomingSignal));
        }
    };

    const sendMarkdown = (markdown: string) => {
        if (peer && isConnected) {
            // Only send if connected
            peer.send(JSON.stringify({ type: "markdown", payload: markdown }));
        }
    };

    const sendCursor = (cursor: { x: number; y: number }) => {
        if (peer && isConnected) {
            // Only send if connected
            peer.send(JSON.stringify({ type: "cursor", payload: cursor }));
        }
    };

    return {
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
    };
};
