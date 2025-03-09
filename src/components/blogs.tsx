"use client";

import { unstable_ViewTransition as ViewTransition } from "react";
import Routes from "@/constants/Routes";
import { Badge } from "./ui/badge";
import { Link } from "./ui/link";
import { formatRelativeDate } from "@/lib/date";
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
    const { blogs } = useBlogs(tags);

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
                                <ViewTransition
                                    name={`blog-article-date-${article.slug}`}
                                >
                                    <p className="text-xs font-semibold">
                                        {formatRelativeDate(article.date)}
                                    </p>
                                </ViewTransition>
                                <ViewTransition
                                    name={`blog-article-title-${article.slug}`}
                                >
                                    <CardTitle>{article.title}</CardTitle>
                                </ViewTransition>
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
