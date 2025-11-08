"use client";

import { ViewTransition } from "react";
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
import Image from "next/image";

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
                                href={Routes.RANTS_WITH_TAGS(Array.from(set))}
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {blogs.map((article) => (
                    <article key={article.slug}>
                        <Card className="hover:bg-background h-full">
                            <Link href={`/rants/${article.slug}`}>
                                <CardHeader className="relative min-h-[240px]">
                                    <Image
                                        priority
                                        className="rounded-sm object-cover"
                                        src={article.image.src}
                                        alt={article.image.alt}
                                        fill
                                    />
                                </CardHeader>
                                <CardContent className="justify-start">
                                    <div className="flex flex-row gap-4">
                                        <div className="flex flex-1 flex-col gap-6">
                                            <div className="flex flex-col gap-2">
                                                <ViewTransition
                                                    name={`blog-article-date-${article.slug}`}
                                                >
                                                    <p className="text-xs font-semibold">
                                                        {formatRelativeDate(
                                                            article.date,
                                                        )}
                                                    </p>
                                                </ViewTransition>
                                                <ViewTransition
                                                    name={`blog-article-title-${article.slug}`}
                                                >
                                                    <CardTitle>
                                                        {article.title}
                                                    </CardTitle>
                                                </ViewTransition>
                                            </div>
                                            <CardDescription>
                                                {article.description}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    </article>
                ))}
            </div>
        </>
    );
}

export default Blogs;
