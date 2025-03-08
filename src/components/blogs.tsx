"use client";

import Routes from "@/constants/Routes";
import { Badge } from "./ui/badge";
import { Link } from "./ui/link";
import { formatDate } from "@/lib/date";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { useBlogs } from "@/hooks/use-blogs";

type BlogsProps = {
    tags: string[];
    allTags: string[];
};

function Blogs({ tags, allTags }: BlogsProps) {
    const { data: blogs } = useBlogs(tags);

    // Prehydrated so this should never be null
    if (!blogs) {
        return null;
    }

    return (
        <>
            {allTags.length > 0 ? (
                <div className="flex flex-row flex-wrap gap-2 pb-4">
                    {Array.from(allTags).map((tag) => {
                        const isSelected = tags.includes(tag);
                        const set = new Set(tags);

                        if (isSelected) {
                            set.delete(tag);
                        } else {
                            set.add(tag);
                        }

                        return (
                            <Link
                                key={tag}
                                href={Routes.RANTS(Array.from(set))}
                                replace
                            >
                                <Badge
                                    variant={
                                        tags.includes(tag)
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
            {blogs.map((article) => (
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
        </>
    );
}

export default Blogs;
