import { CodeBlock } from "@/components/ui/code-block";
import { BlogParagraph, BlogSubHeading, BlogImage } from "@/components/ui/blog";
import { BlogData } from "..";

export const SERVER_SIDE_FEATURE_FLAGS: BlogData = {
    title: "Server-side feature flags",
    description:
        "The new Next.js app router has made it easier than ever to evaluate feature flags on the server, before the user loads the page.",
    date: "2025-07-05",
    slug: "server-side-feature-flags",
    tags: ["engineering", "nextjs"],
    image: {
        src: `/images/rants/tanstack.png`,
        alt: "Tanstack",
    },
    component: <Post />,
};

function Post() {
    return (
        <>
            <BlogParagraph>
                The new Next.js app router has made it easier than ever to
                evaluate feature flags on the server, before the user loads the
                page. This means that you can deliver a personalised experience
                to your users, without sacrificing performance or shipping a
                tonne of unnecessary code to the browser.
            </BlogParagraph>

            <BlogSubHeading>The problem</BlogSubHeading>
            <BlogParagraph>
                Feature flags are a powerful tool for controlling the release of
                new features. They allow you to enable or disable features for
                specific users, or a percentage of your user base. This is great
                for testing new features in production, or for rolling out
                features gradually.
            </BlogParagraph>
            <BlogParagraph>
                Traditionally, feature flags are evaluated in the browser. This
                means that the browser has to download the feature flag
                configuration, and then evaluate it to determine whether to show
                the feature or not. This can add a noticeable delay to the page
                load time, and can also result in a lot of unnecessary code
                being sent to the browser.
            </BlogParagraph>

            <BlogImage
                src="/images/rants/shrek.png"
                alt="Shrek, but he is a feature flag"
            />

            <BlogSubHeading>The solution</BlogSubHeading>
            <BlogParagraph>
                With the new Next.js app router, you can evaluate feature flags
                on the server. This means that the feature flag is evaluated
                before the page is sent to the browser. This has a number of
                benefits:
            </BlogParagraph>
            <ul className="my-4 list-disc pl-8">
                <li>
                    <span className="font-bold">Improved performance:</span> The
                    browser doesn&apos;t have to download the feature flag
                    configuration, or evaluate it. This means that the page
                    loads faster.
                </li>
                <li>
                    <span className="font-bold">Reduced bundle size:</span> If a
                    feature is disabled, the code for that feature is not sent
                    to the browser. This reduces the size of the JavaScript
                    bundle, which can also improve performance.
                </li>
                <li>
                    <span className="font-bold">Improved security:</span>{" "}
                    Feature flag configuration is not exposed to the browser,
                    which can be important for sensitive features.
                </li>
            </ul>

            <BlogSubHeading>How to do it</BlogSubHeading>
            <BlogParagraph>
                Here is an example of how you can evaluate a feature flag on the
                server in a Next.js app:
            </BlogParagraph>
            <CodeBlock language="typescript">{`
import { cookies } from 'next/headers'

export default function Page() {
	const-show-new-feature = await featureFlags.get('new-feature', {
		userId: cookies().get('userId')?.value,
	})

	if (showNewFeature) {
		return <NewFeature />
	}

	return <OldFeature />
}
`}</CodeBlock>
            <BlogParagraph>
                In this example, we are using the `featureFlags.get()` function
                to evaluate the `new-feature` feature flag. We are passing the
                user ID to the function, so that the feature flag can be
                evaluated for the specific user. If the feature flag is enabled,
                we render the `NewFeature` component. Otherwise, we render the
                `OldFeature` component.
            </BlogParagraph>
        </>
    );
}

export default Post;
