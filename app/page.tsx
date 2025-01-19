import Link from "next/link";

export const metadata = {
    title: "Today I Learned | Tools",
    description: "Tools I've created",
};

export default function Home() {
    return (
        <section className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl">Tools</h1>
            <div className="flex flex-col gap-1">
                <Link href="/thai-time-converter">
                    <h2>Thai Time Converter</h2>
                </Link>
            </div>
        </section>
    );
}
