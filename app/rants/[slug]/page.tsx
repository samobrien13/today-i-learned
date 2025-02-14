import Blog from "@/components/ui/blog";
import { BLOG_ARTICLES } from "@/data/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type RantPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return BLOG_ARTICLES.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: RantPageProps): Promise<Metadata> {
    const { slug } = await params;

    const blog = BLOG_ARTICLES.find((article) => article.slug === slug);

    if (!blog) {
        return {};
    }

    return {
        title: blog.title,
        description: blog.description,
        alternates: {
            canonical: `https://todayilearned.au/rants/${blog.slug}`,
        },
    };
}

async function RantPage({ params }: RantPageProps) {
    const { slug } = await params;
    const blog = BLOG_ARTICLES.find((article) => article.slug === slug);

    if (!blog) {
        notFound();
    }

    return <Blog {...blog} />;
}

export default RantPage;
