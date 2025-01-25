import { formatDate } from "@/lib/date";

type BlogProps = {
    title: string;
    date: string;
    slug: string;
    children: React.ReactNode;
};

function Blog({ title, date, slug, children }: BlogProps) {
    return (
        <article className="flex flex-1 flex-col gap-4">
            <header>
                <h1
                    className="text-2xl font-semibold text-primary"
                    style={{
                        viewTransitionName: `blog-article-title-${slug}`,
                    }}
                >
                    {title}
                </h1>
                <p
                    className="text-sm font-semibold"
                    style={{
                        viewTransitionName: `blog-article-date-${slug}`,
                    }}
                >
                    {formatDate(date)}
                </p>
            </header>
            <div>{children}</div>
        </article>
    );
}

export function BlogSection({ children }: { children: React.ReactNode }) {
    return <section className="flex flex-col">{children}</section>;
}

export function BlogHeading({ children }: { children: React.ReactNode }) {
    return <h2 className="pb-2 text-xl">{children}</h2>;
}

export function BlogSubHeading({ children }: { children: React.ReactNode }) {
    return <h3 className="pb-2 text-lg">{children}</h3>;
}

export function BlogParagraph({ children }: { children: React.ReactNode }) {
    return <p className="pb-6">{children}</p>;
}

export function BlogPre({ children }: { children: React.ReactNode }) {
    return (
        <pre className="mb-6 overflow-auto rounded-md bg-muted p-4 text-muted-foreground">
            {children}
        </pre>
    );
}

export function BlogCode({ children }: { children: React.ReactNode }) {
    return (
        <code className="rounded-sm bg-muted p-1 text-sm text-muted-foreground">
            {children}
        </code>
    );
}

export function BlogUnorderedList({ children }: { children: React.ReactNode }) {
    return (
        <ul className="ml-4 flex list-disc flex-col gap-2 py-6">{children}</ul>
    );
}

export function BlogListItem({ children }: { children: React.ReactNode }) {
    return <li>{children}</li>;
}

export default Blog;
