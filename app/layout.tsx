import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} max-w-xl antialiased md:mx-auto`}
            >
                <main className="flex min-h-screen min-w-0 flex-auto flex-col p-4 md:px-0">
                    <Navbar />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
