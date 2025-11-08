import { ViewTransition } from "react";
import { formatDate } from "@/lib/date";
import { Link } from "../link";
import { Badge } from "../badge";
import { BlogData } from "@/data/blog";
import Routes from "@/constants/Routes";
import Share from "../share";
import Feedback from "../feedback";
import Likes from "../likes";
import Image, { ImageProps } from "next/image";

type BlogProps = BlogData;

function Blog({ title, description, date, slug, component, tags }: BlogProps) {
    return (
        <article className="flex flex-1 flex-col gap-8">
            <header>
                <ViewTransition name={`blog-article-title-${slug}`}>
                    <h1 className="text-xl font-semibold">{title}</h1>
                </ViewTransition>
                <ViewTransition name={`blog-article-date-${slug}`}>
                    <p className="text-sm font-semibold">{formatDate(date)}</p>
                </ViewTransition>
            </header>
            <div>{component}</div>
            <div className="flex flex-row items-center gap-2">
                <Share title={title} text={description} />
                {tags.length > 0
                    ? Array.from(new Set(tags)).map((tag) => {
                          return (
                              <Link
                                  key={tag}
                                  href={Routes.RANTS_WITH_TAGS([tag])}
                              >
                                  <Badge variant="secondary">{tag}</Badge>
                              </Link>
                          );
                      })
                    : null}
            </div>
            <Likes slug={slug} />
            <Feedback slug={slug} />
        </article>
    );
}

export function BlogHeading({ children }: { children: React.ReactNode }) {
    return <h2 className="pt-2 pb-2 text-lg font-semibold">{children}</h2>;
}

export function BlogSubHeading({ children }: { children: React.ReactNode }) {
    return <h3 className="pb-2 text-lg">{children}</h3>;
}

export function BlogParagraph({ children }: { children: React.ReactNode }) {
    return <p className="pb-6 leading-relaxed">{children}</p>;
}

export function BlogCode({ children }: { children: React.ReactNode }) {
    return (
        <code className="bg-muted text-muted-foreground rounded-sm p-1 text-sm">
            {children}
        </code>
    );
}

export function BlogUnorderedList({ children }: { children: React.ReactNode }) {
    return (
        <ul className="ml-4 flex list-disc flex-col gap-2 pb-6">{children}</ul>
    );
}

export function BlogListItem({ children }: { children: React.ReactNode }) {
    return <li>{children}</li>;
}

export function BlogImage({ alt, className, ...rest }: ImageProps) {
    return (
        <picture className="relative mb-6 flex aspect-video w-full overflow-hidden">
            <Image
                {...rest}
                className={`border-muted rounded-md border-2 object-cover ${className}`}
                sizes="(max-width: 768px) 100vw, 768px"
                fill
                alt={alt}
            />
        </picture>
    );
}

export default Blog;
