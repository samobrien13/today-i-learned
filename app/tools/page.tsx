import { unstable_ViewTransition as ViewTransition } from "react";
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
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Tools",
    description: "Tools I've created",
};

type SearchParams = Promise<{
    "tags[]": string | string[] | undefined;
}>;

async function Tools({ searchParams }: { searchParams: SearchParams }) {
    const { "tags[]": tags } = await searchParams;
    const tagsArray = tags ? (Array.isArray(tags) ? tags : [tags]) : [];

    const tagsSet = new Set(tagsArray);
    const allTags = new Set(TOOLS.flatMap((tool) => tool.tags));

    const filteredTools =
        tagsArray.length > 0
            ? TOOLS.filter((tool) => tool.tags.some((tag) => tagsSet.has(tag)))
            : TOOLS;

    return (
        <Tab
            title={metadata.title as string}
            subtitle={metadata.description as string}
        >
            {allTags.size > 0 ? (
                <div className="flex flex-row flex-wrap gap-2 pb-4">
                    {Array.from(allTags).map((tag) => {
                        const isSelected = tagsSet.has(tag);
                        const set = new Set(tagsSet);

                        if (isSelected) {
                            set.delete(tag);
                        } else {
                            set.add(tag);
                        }

                        return (
                            <Link
                                key={tag}
                                href={Routes.TOOLS(Array.from(set))}
                                replace
                            >
                                <Badge
                                    variant={
                                        tagsArray.includes(tag)
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {tag}
                                </Badge>
                            </Link>
                        );
                    })}
                </div>
            ) : null}
            {filteredTools.map((tool) => (
                <ViewTransition name={`${tool.slug}-card`} key={tool.title}>
                    <Card
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
                </ViewTransition>
            ))}
        </Tab>
    );
}

export default Tools;
