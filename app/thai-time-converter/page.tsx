import ThaiTimeConverter from "@/components/thai-time-converter";
import { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://example.com"),
    title: {
        default: "Next.js Portfolio Starter",
        template: "%s | Next.js Portfolio Starter",
    },
    description: "This is my portfolio.",
    openGraph: {
        title: "My Portfolio",
        description: "This is my portfolio.",
        url: "https://example.com",
        siteName: "My Portfolio",
        locale: "en_AU",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function Page() {
    return (
        <section className="flex-1">
            <ThaiTimeConverter />
        </section>
    );
}
