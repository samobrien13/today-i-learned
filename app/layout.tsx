import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Providers from "@/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://todayilearned.au"),
    title: {
        template: "%s | TiL",
        default: "Today I Learned",
    },
    openGraph: {
        images: ["/icon_x512.png"],
    },
    description: "Collection of rants and tools about things I've learned",
    keywords: ["programming", "web development", "tools", "blog"],
    alternates: {
        canonical: "https://todayilearned.au",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* suppressHydrationWarning required by next-themes */}
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased md:mx-auto md:max-w-xl`}
            >
                <Providers>
                    <main className="flex min-h-screen min-w-0 flex-auto flex-col p-4 md:px-0">
                        <Navbar />
                        {children}
                        <Footer />
                    </main>
                </Providers>
            </body>
        </html>
    );
}
