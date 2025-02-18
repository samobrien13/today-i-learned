import type { NextConfig } from "next";
import "@/env";

const CONTENT_SECURITY_POLICY = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://us-assets.i.posthog.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
    font-src 'self' data:;
`;

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: CONTENT_SECURITY_POLICY.replace(/\n/g, ""),
    },
    {
        key: "Referrer-Policy",
        value: "origin-when-cross-origin",
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
    },
    {
        key: "Permissions-Policy",
        value: "",
    },
];

const nextConfig: NextConfig = {
    productionBrowserSourceMaps: true,
    experimental: {
        reactCompiler: true,
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
