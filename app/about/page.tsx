import { BlogParagraph } from "@/components/ui/blog";
import { Link } from "@/components/ui/link";
import Tab from "@/components/ui/tab";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    alternates: {
        canonical: "https://todayilearned.au/about",
    },
};

export default function About() {
    return (
        <Tab title="About">
            <BlogParagraph>
                Hi, I&apos;m Sam, and this is a collection of things I&apos;ve
                learned. I write about programming, web development, and other
                topics that interest me.
            </BlogParagraph>
            <BlogParagraph>
                I have been working professionally as a software engineer for
                over 10 years, and worked in a variety of roles in Australia and
                around the world.
            </BlogParagraph>
            <BlogParagraph>
                I spend most of my time working with{" "}
                <Link href="https://nextjs.org/">Next.js</Link> and{" "}
                <Link href="https://expo.dev/">Expo</Link>, but I often venture
                into other areas.
            </BlogParagraph>
            <BlogParagraph>
                I also create&nbsp;
                <Link href="/tools">tools</Link> that I find useful.
            </BlogParagraph>
            <BlogParagraph>
                This site is aimed to be a good resource for copying the latest
                good Next.js patterns and practices. I will use it as a test bed
                for new library updates and ideas.
            </BlogParagraph>
            <BlogParagraph>
                I always aspire to be{" "}
                <Link href="https://grugbrain.dev" external>
                    grug
                </Link>
                .
            </BlogParagraph>
        </Tab>
    );
}
