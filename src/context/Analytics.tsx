"use client";

import { env } from "@/env";
import { usePathname, useSearchParams } from "next/navigation";
import Posthog from "posthog-js";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";

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

// Wrap this in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
export function SuspendedPostHogPageView() {
    return (
        <Suspense fallback={null}>
            <PageView />
        </Suspense>
    );
}

function AnalyticsProvider({ children }: AnalyticsProviderProps) {
    useEffect(() => {
        if (env.NEXT_PUBLIC_POSTHOG_KEY) {
            Posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
                person_profiles: "always",
            });
        }
    }, []);

    return (
        <PostHogProvider client={Posthog}>
            <SuspendedPostHogPageView />
            {children}
        </PostHogProvider>
    );
}

export default AnalyticsProvider;
