import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Providers from "@/providers";
import Script from "next/script";
import { env } from "@/env";

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
    description: "Collection of rants and tools I've created over the years.",
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
            <head>
                <Script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}}`}
                />
                <Script id="gtag-init">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                    `}
                </Script>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground !min-w-full antialiased`}
            >
                <div className="md:mx-auto md:max-w-2xl">
                    <Providers>
                        <main className="flex min-h-screen min-w-0 flex-auto flex-col p-4 md:px-0">
                            <Navbar />
                            {children}
                            <Footer />
                        </main>
                    </Providers>
                </div>
            </body>
        </html>
    );
}
