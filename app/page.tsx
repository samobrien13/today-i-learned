import { Link } from "@/components/ui/link";
import Tab from "@/components/ui/tab";

export default function Home() {
    return (
        <Tab title="About">
            <p>
                This is a collection of things I&apos;ve learned. I write about
                programming, web development, and other topics that interest me.
            </p>
            <p>
                I spend most of my time working with Next.js and Expo, but I
                often venture into other areas.
            </p>
            <p>
                I also create&nbsp;
                <Link href="/tools">tools</Link> that I find useful.
            </p>
        </Tab>
    );
}
