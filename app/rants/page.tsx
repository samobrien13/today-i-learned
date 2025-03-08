import Tab from "@/components/ui/tab";
import { BLOG_ARTICLES } from "@/data/blog";
import { Metadata } from "next";
import { getBlogs } from "@/actions/blogs";
import Blogs from "@/components/blogs";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";

export const metadata: Metadata = {
    title: "Rants",
    description: "Read my rants about all sorts of things.",
    alternates: {
        canonical: "https://todayilearned.au/rants",
    },
};

type SearchParams = Promise<{
    "tags[]": string | string[] | undefined;
}>;

async function Rants({ searchParams }: { searchParams: SearchParams }) {
    const queryClient = new QueryClient();

    const { "tags[]": tags } = await searchParams;
    const tagsArray = tags ? (Array.isArray(tags) ? tags : [tags]) : [];

    const allTags = [
        ...new Set(BLOG_ARTICLES.flatMap((article) => article.tags)),
    ];

    await queryClient.prefetchInfiniteQuery({
        initialPageParam: '',
        queryKey: ["blogs", tagsArray],
        queryFn: ({ pageParam }) => getBlogs(tagsArray, pageParam),
    });

    return (
        <Tab
            title={metadata.title as string}
            subtitle={metadata.description as string}
        >
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Blogs tags={tagsArray} allTags={allTags} />
            </HydrationBoundary>
        </Tab>
    );
}

export default Rants;
