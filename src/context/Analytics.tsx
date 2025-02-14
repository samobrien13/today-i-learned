"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Posthog from "posthog-js";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { useEffect } from "react";

type AnalyticsProviderProps = {
    children: React.ReactNode;
};

function PageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const posthog = usePostHog();

    // Track pageviews
    useEffect(() => {
        if (pathname && posthog) {
            let url = window.origin + pathname;
            if (searchParams.toString()) {
                url = url + "?" + searchParams.toString();
            }

            posthog.capture("$pageview", { $current_url: url });
        }
    }, [pathname, searchParams, posthog]);

    return null;
}

function AnalyticsProvider({ children }: AnalyticsProviderProps) {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
            Posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
                person_profiles: "always",
            });
        }
    }, []);

    return (
        <PostHogProvider client={Posthog}>
            <PageView />
            {children}
        </PostHogProvider>
    );
}

export default AnalyticsProvider;
