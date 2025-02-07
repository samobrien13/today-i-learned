import Tab from "@/components/ui/tab";
import { Link } from "@/components/ui/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TOOLS } from "@/data/tools";
import Routes from "@/constants/Routes";

export const metadata = {
    title: "Tools",
    description: "Tools I've created",
};

export default function Home() {
    console.log(TOOLS);
    return (
        <Tab title="Tools">
            {TOOLS.map((tool) => (
                <Card
                    key={tool.title}
                    style={{
                        viewTransitionName: `${tool.slug}-card`,
                    }}
                >
                    <Link href={Routes.TOOL(tool.slug)}>
                        <CardHeader>
                            <CardTitle>{tool.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                {tool.description}
                            </CardDescription>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </Tab>
    );
}
