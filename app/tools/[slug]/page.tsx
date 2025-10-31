import { ViewTransition } from "react";
import { TOOLS } from "@/components/tools";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type ToolPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return TOOLS.map((t) => ({
        slug: t.slug,
    }));
}

export async function generateMetadata({
    params,
}: ToolPageProps): Promise<Metadata> {
    const { slug } = await params;

    const tool = TOOLS.find((t) => t.slug === slug);

    if (!tool) {
        return {};
    }

    return {
        title: tool.title,
        description: tool.description,
        alternates: {
            canonical: `https://todayilearned.au/tools/${tool.slug}`,
        },
    };
}

async function ToolPage({ params }: ToolPageProps) {
    const { slug } = await params;
    const tool = TOOLS.find((t) => t.slug === slug);

    if (!tool) {
        notFound();
    }

    return (
        <section className="flex-1">
            <ViewTransition name={`${tool.slug}-card`}>
                {tool.component({
                    title: tool.title,
                    description: tool.description,
                    slug: tool.slug,
                    tags: tool.tags,
                })}
            </ViewTransition>
        </section>
    );
}

export default ToolPage;
