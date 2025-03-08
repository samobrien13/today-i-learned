"use client";

import { formatDate } from "@/lib/date";

type BlogDateProps = {
    date: string;
    slug: string;
};

function BlogDate({ date, slug }: BlogDateProps) {
    return (
        <p
            className="text-sm font-semibold"
            style={{
                viewTransitionName: `blog-article-date-${slug}`,
            }}
        >
            {formatDate(date)}
        </p>
    );
}

export default BlogDate;
