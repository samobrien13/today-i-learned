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
            <p>
                Hi, I&apos;m Sam, and this is a collection of things I&apos;ve
                learned. I write about programming, web development, and other
                topics that interest me.
            </p>
            <p>
                I have been working professionally as a software engineer for
                over 10 years, and worked in a variety of roles in Australia and
                around the world.
            </p>
            <p>
                I spend most of my time working with{" "}
                <Link href="https://nextjs.org/">Next.js</Link> and{" "}
                <Link href="https://expo.dev/">Expo</Link>, but I often venture
                into other areas.
            </p>
            <p>
                I also create&nbsp;
                <Link href="/tools">tools</Link> that I find useful.
            </p>
            <p>
                I always aspire to be{" "}
                <Link href="https://grugbrain.dev" external>
                    grug
                </Link>
                .
            </p>
        </Tab>
    );
}
