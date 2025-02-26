import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import Tab from "@/components/ui/tab";

export default function Home() {
    return (
        <Tab title="About">
            <h1 className="bg-linear-to-r from-primary to-primary-foreground bg-clip-text text-4xl text-transparent">
                Today I Learned
            </h1>
            <p>
                This is a collection of things I&apos;ve learned. I write about
                programming, web development, and other topics that interest me.
            </p>
            <p>
                I have been working professionally as a software engineer for
                over 10 years, and worked in a variety of roles in Australia and
                around the world.
            </p>
            <Link href="/rants">
                <Card>
                    <CardHeader />
                    <CardContent>
                        <p>
                            I spend most of my time working with Next.js and{" "}
                            Expo, but I often venture into other areas.
                        </p>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/tools">
                <Card>
                    <CardHeader />
                    <CardContent>
                        <p>I also create&nbsp;tools that I find useful.</p>
                    </CardContent>
                </Card>
            </Link>
        </Tab>
    );
}
