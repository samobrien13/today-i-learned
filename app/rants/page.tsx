import Tab from "@/components/ui/tab";
import { BLOG_ARTICLES } from "@/data/blog";
import { formatDate } from "@/lib/date";
import { Link } from "@/components/ui/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Routes from "@/constants/Routes";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Rants",
    description: "Read my rants about all sorts of things.",
    alternates: {
        canonical: "https://todayilearned.au/rants",
    },
};

type SearchParams = Promise<{
    "tags[]": string | string[] | undefined;
}>;

async function Rants({ searchParams }: { searchParams: SearchParams }) {
    const { "tags[]": tags } = await searchParams;
    console.log(tags);
    const tagsArray = tags ? (Array.isArray(tags) ? tags : [tags]) : [];
    console.log(tagsArray);

    const tagsSet = new Set(tagsArray);
    const allTags = new Set(BLOG_ARTICLES.flatMap((article) => article.tags));

    const filteredArticles =
        tagsArray.length > 0
            ? BLOG_ARTICLES.filter((article) =>
                  article.tags.some((tag) => tagsSet.has(tag)),
              )
            : BLOG_ARTICLES;

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
                                href={Routes.RANTS(Array.from(set))}
                                className="text-sm text-muted-foreground"
                            >
                                <Badge
                                    className="text-sm text-muted-foreground"
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
            {filteredArticles.map((article) => (
                <Card key={article.slug}>
                    <Link href={`/rants/${article.slug}`}>
                        <article className="flex flex-col">
                            <CardHeader>
                                <p
                                    className="text-xs font-semibold"
                                    style={{
                                        viewTransitionName: `blog-article-date-${article.slug}`,
                                    }}
                                >
                                    {formatDate(article.date)}
                                </p>
                                <CardTitle
                                    style={{
                                        viewTransitionName: `blog-article-title-${article.slug}`,
                                    }}
                                >
                                    {article.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {article.description}
                                </CardDescription>
                            </CardContent>
                        </article>
                    </Link>
                </Card>
            ))}
        </Tab>
    );
}

export default Rants;
