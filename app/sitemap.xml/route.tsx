import { generateSiteMapXML } from "@/lib/seo";

export async function GET() {
    const sitemap = generateSiteMapXML("https://todayilearned.au");

    return new Response(sitemap, {
        status: 200,
        headers: {
            "Content-Type": "text/xml",
            "Cache-Control": "s-maxage=86400, stale-while-revalidate",
        },
    });
}
