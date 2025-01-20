import Tab from "@/components/ui/tab";
import { Link } from "next-view-transitions";

export const metadata = {
    title: "Today I Learned | Tools",
    description: "Tools I've created",
};

export default function Home() {
    return (
        <Tab title="Tools">
            <Link
                href="/tools/thai-time-converter"
                style={{
                    viewTransitionName: "thai-time-converter-title",
                }}
            >
                Thai Time Converter
            </Link>
            <Link
                href="/tools/recipe-generator"
                style={{
                    viewTransitionName: "recipe-generator-title",
                }}
            >
                Recipe Generator
            </Link>
            <Link
                href="/tools/password-generator"
                style={{
                    viewTransitionName: "password-generator-title",
                }}
            >
                Password Generator
            </Link>
        </Tab>
    );
}
