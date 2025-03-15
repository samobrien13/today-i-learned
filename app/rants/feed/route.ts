import { BLOG_ARTICLES } from "@/data/blog";

import RSS from "rss";

const siteUrl = "https://todayilearned.au";

const feedOptions: RSS.FeedOptions = {
    title: "Rants | Today I Learned",
    description: "Read my rants about all sorts of things.",
    site_url: siteUrl,
    feed_url: `${siteUrl}/rants/feed`,
    pubDate: new Date(),
    copyright: `All rights unreserved ${new Date().getFullYear()}`,
};

export async function GET() {
    const feed = new RSS(feedOptions);

    BLOG_ARTICLES.map((post) => {
        feed.item({
            title: post.title,
            description: post.description,
            url: `${siteUrl}/rants/${post.slug}`,
            date: post.date,
        });
    });

    return new Response(feed.xml({ indent: true }), {
        status: 200,
        headers: {
            "Content-Type": "text/xml",
            "Cache-Control": "s-maxage=86400, stale-while-revalidate",
        },
    });
}
