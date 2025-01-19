import Link from "next/link";

const BLOG_ARTICLES = [
    {
        title: "How to tell the time Thai style",
        slug: "how-to-tell-the-time-thai-style",
    },
];

export default function Home() {
    return (
        <section className="flex-1">
            {BLOG_ARTICLES.map((article) => (
                <Link key={article.slug} href={`blog/${article.slug}`}>
                    <h2>{article.title}</h2>
                </Link>
            ))}
        </section>
    );
}
