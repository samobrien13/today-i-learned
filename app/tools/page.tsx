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
                <CardHeader>
                    <Link
                        href="/tools/thai-time-converter"
                        style={{
                            viewTransitionName: "thai-time-converter-title",
                        }}
                    >
                        <CardTitle>Thai Time Converter</CardTitle>
                    </Link>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <Link
                        href="/tools/recipe-generator"
                        style={{
                            viewTransitionName: "recipe-generator-title",
                        }}
                    >
                        <CardTitle>Recipe Generator</CardTitle>
                    </Link>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <Link
                        href="/tools/password-generator"
                        style={{
                            viewTransitionName: "password-generator-title",
                        }}
                    >
                        <CardTitle>Password Generator</CardTitle>
                    </Link>
                </CardHeader>
            </Card>
        </Tab>
    );
}
