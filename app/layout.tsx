import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ViewTransitions } from "next-view-transitions";

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
    title: "Today I Learned",
    description: "Collection of tools and articles about things I've learned",
    themeColor: "#0a0a0a",
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
        <ViewTransitions>
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
        </ViewTransitions>
    );
}
