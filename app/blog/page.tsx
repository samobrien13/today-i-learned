import Tab from "@/components/ui/tab";
import { BLOG_ARTICLES } from "@/data/blog";
import { formatDate } from "@/lib/date";
import { Link } from "next-view-transitions";

export const metadata = {
    title: "Blog | Today I Learned",
    description: "Read my blog posts",
};

function Blog() {
    return (
        <Tab title="Blog">
            {BLOG_ARTICLES.map((article) => (
                <Link key={article.slug} href={`blog/${article.slug}`}>
                    <article className="flex flex-col md:flex-row md:gap-2">
                        <p
                            className="text-muted-foreground"
                            style={{
                                viewTransitionName: `blog-article-date-${article.slug}`,
                            }}
                        >
                            {formatDate(article.date)}
                        </p>
                        <h2
                            style={{
                                viewTransitionName: `blog-article-title-${article.slug}`,
                            }}
                        >
                            {article.title}
                        </h2>
                    </article>
                </Link>
            ))}
        </Tab>
    );
}

export default Blog;
