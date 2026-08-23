const supportResponses = [
    "Did you try turning it off and on again?",
    "Did you delete your node_modules and re-install?",
    "Did you update your environment variables?",
    "Did you try Googling it?",
    "Did you try doing what the error message says?",
    "Did you clear your cache?",
    "Have you checked whether you are looking in the right environment?",
];

import { experimental_upgradeWebSocket } from "@vercel/functions";

export async function GET() {
    return experimental_upgradeWebSocket((ws) => {
        ws.on("message", () => {
            const randomIndex = Math.floor(
                Math.random() * supportResponses.length,
            );
            const botResponse = supportResponses[randomIndex];

            ws.send(JSON.stringify({ sender: "bot", text: botResponse }));
        });
    });
}
