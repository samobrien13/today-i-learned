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
            <Card>
                <Link
                    href="/tools/thai-time-converter"
                    style={{
                        viewTransitionName: "thai-time-converter-title",
                    }}
                >
                    <CardHeader>
                        <CardTitle>Thai Time Converter</CardTitle>
                    </CardHeader>
                </Link>
            </Card>
            <Card>
                <Link
                    href="/tools/recipe-generator"
                    style={{
                        viewTransitionName: "recipe-generator-title",
                    }}
                >
                    <CardHeader>
                        <CardTitle>Recipe Generator</CardTitle>
                    </CardHeader>
                </Link>
            </Card>
            <Card>
                <Link
                    href="/tools/password-generator"
                    style={{
                        viewTransitionName: "password-generator-title",
                    }}
                >
                    <CardHeader>
                        <CardTitle>Password Generator</CardTitle>
                    </CardHeader>
                </Link>
            </Card>
        </Tab>
    );
}
