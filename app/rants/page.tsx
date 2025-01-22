import Tab from "@/components/ui/tab";
import { BLOG_ARTICLES } from "@/data/blog";
import { formatDate } from "@/lib/date";
import { Link } from "@/components/ui/link";

export const metadata = {
    title: "Rants | Today I Learned",
    description: "Read my rants about all sorts of things.",
};

function Rants() {
    return (
        <Tab title="Rants">
            {BLOG_ARTICLES.map((article) => (
                <Link key={article.slug} href={`/rants/${article.slug}`}>
                    <article className="flex flex-col">
                        <p
                            className="text-xs font-semibold"
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

export default Rants;
