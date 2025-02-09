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

export const metadata: Metadata = {
    title: "Rants",
    description: "Read my rants about all sorts of things.",
    alternates: {
        canonical: "https://todayilearned.au/rants",
    },
};

function Rants() {
    return (
        <Tab
            title={metadata.title as string}
            subtitle={metadata.description as string}
        >
            {BLOG_ARTICLES.map((article) => (
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
