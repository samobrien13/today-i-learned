import Tab from "@/components/ui/tab";

export const metadata = {
    title: "Today I Learned | Tools",
    description: "Tools I've created",
};

export default function Home() {
    return (
        <Tab title="About">
            <p>
                This is a collection of things I&apos;ve learned. I write about
                programming, web development, and other topics that interest me.
            </p>
            <p>I also create tools that I find useful.</p>
        </Tab>
    );
}
