import { formatDate } from "@/lib/date";

type BlogProps = {
    title: string;
    date: string;
    children: React.ReactNode;
};

function Blog({ title, date, children }: BlogProps) {
    return (
        <section className="flex flex-1 flex-col gap-4">
            <div>
                <h1 className="text-2xl">{title}</h1>
                <p className="text-sm font-semibold">{formatDate(date)}</p>
            </div>
            <article className="flex flex-col gap-2">{children}</article>
        </section>
    );
}

export function BlogHeading({ children }: { children: React.ReactNode }) {
    return <h2 className="text-xl">{children}</h2>;
}

export function BlogParagraph({ children }: { children: React.ReactNode }) {
    return <p>{children}</p>;
}

export default Blog;
