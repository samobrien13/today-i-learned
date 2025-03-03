import { formatDate } from "@/lib/date";
import { Link } from "../link";
import { Badge } from "../badge";
import { BlogData } from "@/data/blog";
import Routes from "@/constants/Routes";
import Share from "../share";
import Feedback from "../feedback";
import Likes from "../likes";

type BlogProps = BlogData;

function Blog({ title, description, date, slug, component, tags }: BlogProps) {
    return (
        <article className="flex flex-1 flex-col gap-8">
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
            <div>{component}</div>
            <div className="flex flex-row items-center gap-2">
                <Share title={title} text={description} />
                {tags.length > 0
                    ? Array.from(new Set(tags)).map((tag) => {
                          return (
                              <Link key={tag} href={Routes.RANTS([tag])}>
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
    return <h2 className="pb-2 pt-2 text-xl">{children}</h2>;
}

export function BlogSubHeading({ children }: { children: React.ReactNode }) {
    return <h3 className="pb-2 text-lg">{children}</h3>;
}

export function BlogParagraph({ children }: { children: React.ReactNode }) {
    return <p className="pb-6 leading-relaxed">{children}</p>;
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
        <ul className="ml-4 flex list-disc flex-col gap-2 pb-6">{children}</ul>
    );
}

export function BlogListItem({ children }: { children: React.ReactNode }) {
    return <li>{children}</li>;
}

export default Blog;
