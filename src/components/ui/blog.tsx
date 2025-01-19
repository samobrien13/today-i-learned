import { formatDate } from "@/lib/date";

type BlogProps = {
    title: string;
    date: string;
    children: React.ReactNode;
};

function Blog({ title, date, children }: BlogProps) {
    return (
        <section className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl">{title}</h1>
            <p>Date: {formatDate(date)}</p>
            <article className="flex flex-col gap-2">{children}</article>
        </section>
    );
}

export function BlogHeading({ children }: { children: React.ReactNode }) {
    return <h2>{children}</h2>;
}

export function BlogParagraph({ children }: { children: React.ReactNode }) {
    return <p>{children}</p>;
}

export default Blog;
