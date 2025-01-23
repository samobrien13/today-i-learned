import Tab from "@/components/ui/tab";
import { Link } from "@/components/ui/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
    title: "Tools | Today I Learned",
    description: "Tools I've created",
};

export default function Home() {
    return (
        <Tab title="Tools">
            <Card
                style={{
                    viewTransitionName: "thai-time-converter-card",
                }}
            >
                <Link href="/tools/thai-time-converter">
                    <CardHeader>
                        <CardTitle>Thai Time Converter</CardTitle>
                    </CardHeader>
                </Link>
            </Card>
            <Card
                style={{
                    viewTransitionName: "recipe-generator-card",
                }}
            >
                <Link href="/tools/recipe-generator">
                    <CardHeader>
                        <CardTitle>Recipe Generator</CardTitle>
                    </CardHeader>
                </Link>
            </Card>
            <Card
                style={{
                    viewTransitionName: "password-generator-card",
                }}
            >
                <Link href="/tools/password-generator">
                    <CardHeader>
                        <CardTitle>Password Generator</CardTitle>
                    </CardHeader>
                </Link>
            </Card>
        </Tab>
    );
}
