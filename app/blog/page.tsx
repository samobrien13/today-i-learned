import Tab from "@/components/ui/tab";
import { BLOG_ARTICLES } from "@/data/blog";
import { formatDate } from "@/lib/date";
import Link from "next/link";

export const metadata = {
    title: "Today I Learned | Blog",
    description: "Read my blog posts",
};

function Blog() {
    return (
        <Tab title="Blog">
            {BLOG_ARTICLES.map((article) => (
                <Link key={article.slug} href={`blog/${article.slug}`}>
                    <article className="flex flex-col md:flex-row md:gap-2">
                        <p className="text-gray-400">
                            {formatDate(article.date)}
                        </p>
                        <h2>{article.title}</h2>
                    </article>
                </Link>
            ))}
        </Tab>
    );
}

export default Blog;
