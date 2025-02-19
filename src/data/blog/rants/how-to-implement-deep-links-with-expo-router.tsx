import { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { CodeBlock } from "@/components/ui/code-block";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";

export const HOW_TO_IMPLEMENT_DEEP_LINKS_WITH_EXPO_ROUTER: BlogData = {
    title: "How to implement deep links with Expo Router",
    description:
        "Learn bypass the default Expo Router link handling and use branch deep links",
    date: "2025-02-19",
    slug: "how-to-implement-deep-links-with-expo-router",
    tags: ["engineering", "expo"],
    component: <HowToImplementDeepLinksWithExpoRouter />,
};

function HowToImplementDeepLinksWithExpoRouter() {
    return (
        <>
            <BlogParagraph>
                If you&apos;re wanting to introduce attribution based
                deeplinking into your app using Expo router and struggling to
                find a solution to bypass the default link handling you will
                find the answer here.
            </BlogParagraph>
            <BlogHeading>Expo Router</BlogHeading>
            <BlogParagraph>
                18 months ago I was bootstrapping a new React Native app for my
                company and I decided to take a punt on using{" "}
                <Link
                    href="https://docs.expo.dev/router/introduction/"
                    external
                >
                    Expo Router
                </Link>
                as an alternative to{" "}
                <Link href="https://reactnavigation.org/" external>
                    React Navigation
                </Link>
                .
            </BlogParagraph>
            <BlogParagraph>
                At the time it felt very raw, but because we were already using{" "}
                <Link href="https://nextjs.org/" external>
                    Next.js
                </Link>{" "}
                and the rest of our team had limited React Native experience I
                thought that having our mobile app structure closely mimic our
                website would make the transition smoother for web devs.
            </BlogParagraph>
            <BlogParagraph>
                I found the web-like routing transform the way I thought about
                mobile development. By treating each page as a url type
                structure you have to think more closely about what data is
                passed and where it is fetched from. Combining this approach
                with{" "}
                <Link
                    href="https://tanstack.com/query/latest/docs/framework/react/overview"
                    external
                >
                    react-query
                </Link>{" "}
                lead to an incredibly simple project structure with no need for
                much client side logic at all.
            </BlogParagraph>
            <BlogParagraph>
                I also really enjoy the nested file structure for things like
                authenticated routes and tab layouts. What would have been
                difficult or quite manual with navigation is solved by simply
                the placement of a file. If you want something to happen after
                login i.e your deeplink handler, you just nest it within the
                authenticated layout.
            </BlogParagraph>
            <BlogHeading>Branch</BlogHeading>
            <BlogParagraph>
                Because Expo Router was (and still is) so new, I came across a
                few things that just weren&apos;t possible or scarcely
                documented, one of which was deeplinking. In my case I ran into
                a blocker with <Link href="https://branch.io">Branch.io</Link>{" "}
                (side note, the branch docs are terrible).
            </BlogParagraph>
            <BlogParagraph>
                By default, Expo Router handles linking in your app for you, by
                virtue of the file structure, just like a website. This is
                great, because you don&apos;t have to actively think about this
                for each page like you would with React Navigation. However when
                it comes to using things like branch links, this gets in the
                way.
            </BlogParagraph>
            <BlogParagraph>
                Branch links are formatted with a custom domain and a path which
                is usually a random string. To get these to work with any app
                you need to configure the domains. This is easy enough following
                the Expo docs for{" "}
                <Link
                    href="https://docs.expo.dev/linking/android-app-links/"
                    external
                >
                    Android App Links
                </Link>{" "}
                and{" "}
                <Link
                    href="https://docs.expo.dev/linking/ios-universal-links/"
                    external
                >
                    iOS Universal Links
                </Link>
                .
            </BlogParagraph>
            <BlogParagraph>
                Unfortunately, Expo Router then tries to automatically handle
                the path, and when it is a random branch string this will lead
                to a not found error.
            </BlogParagraph>
            <BlogHeading>The fix</BlogHeading>
            <BlogParagraph>
                After lurking in the Expo discord for months I finally
                discovered a hidden doc on overriding{" "}
                <Link href="https://docs.expo.dev/router/advanced/native-intent/">
                    native intents
                </Link>
                . The solution suggested is far from ideal however, because you
                probably don&apos;t have the required context in this file to
                make a decision on where to send the user. The answer is as easy
                as the following:
            </BlogParagraph>
            <CodeBlock language="typescript" filename="app/+native-intent.tsx">
                {`export async function redirectSystemPath() {
    return '/';
}`}
            </CodeBlock>
            <BlogParagraph>
                That&apos;s it! This will essentially void the Expo routing
                functionality and pass it off into your app. From here you are
                free to handle Branch links like in a regular react-native app.
                As a bonus, you can place this hook within your authenticated
                route layout so it only gets hit after the user is logged in!
            </BlogParagraph>
            <CodeBlock
                language="typescript"
                filename="src/hooks/use-deeplink-observer.tsx"
            >
                {`import Constants from 'expo-constants';
import { Href, router } from 'expo-router';
import { useEffect } from 'react';
import branch, { BranchParams } from 'react-native-branch';

function handleDeeplink(params: BranchParams | undefined) {
    if (!params) {
        return null;
    }

    if (params['+non_branch_link']) {
        const link = params['+non_branch_link'] as string;

        const { pathname, protocol } = new URL(link);

        if (
            Constants.expoConfig?.scheme &&
            protocol.startsWith(Constants.expoConfig?.scheme as string)
        ) {
            const match = link.match(
                new RegExp(\`^$\{Constants.expoConfig.scheme}://(.*)\`),
            );
            if (match) router.navigate(match[1] as Href<string>);
            return;
        }

        if (pathname) {
            router.navigate(pathname as Href<string>);
            return;
        }
    }

    if (!params['+clicked_branch_link']) {
        return null;
    }

    if (params['$deeplink_path']) {
        router.navigate(params['$deeplink_path'] as Href<string>);
    }
}

// Used instead of +native-intent.ts
export function useDeeplinkObserver() {
    useEffect(() => {
        branch.getLatestReferringParams().then((params) => {
            handleDeeplink(params);
        });

        branch.subscribe(({ error, params }) => {
            handleDeeplink(params);
        });
    }, []);
}`}
            </CodeBlock>
            <BlogParagraph>
                This code subscribes to deeplink events using the branch SDK and
                handles them. Branch returns an object to say whether the
                deeplink is from branch or not. If the link contains the url
                scheme configured for Expo then we extract the path from it.
                Otherwise we assume it&apos;s a normal router link and we
                navigate to that. If it is a branch link then we use the
                $deeplink_path query param and route to that.
            </BlogParagraph>
            <BlogParagraph>
                Hopefully as time goes on this will be better documented, but I
                am happy to have finally found the solution to getting this
                working. I don&apos;t think I ever want to go back to React
                Navigation, let alone just for the sake of deeplinks!
            </BlogParagraph>
        </>
    );
}
