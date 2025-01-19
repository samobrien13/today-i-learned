import Tab from "@/components/ui/tab";
import Link from "next/link";

export const metadata = {
    title: "Today I Learned | Tools",
    description: "Tools I've created",
};

export default function Home() {
    return (
        <Tab title="Tools">
            <Link href="/thai-time-converter">
                <h2>Thai Time Converter</h2>
            </Link>
        </Tab>
    );
}
