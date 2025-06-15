import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: "Amazonbot",
                disallow: "/",
            },
        ],
        sitemap: "https://todayilearned.au/sitemap.xml",
    };
}
