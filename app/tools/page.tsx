import Tab from "@/components/ui/tab";
import { Link } from "next-view-transitions";

export const metadata = {
    title: "Today I Learned | Tools",
    description: "Tools I've created",
};

export default function Home() {
    return (
        <Tab title="Tools">
            <Link href="/tools/thai-time-converter">Thai Time Converter</Link>
            <Link href="/tools/recipe-generator">Recipe Generator</Link>
        </Tab>
    );
}
