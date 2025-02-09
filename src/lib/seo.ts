import Routes from "@/constants/Routes";
import { BLOG_ARTICLES } from "@/data/blog";
import { TOOLS } from "@/data/tools";

type SiteMapRoute = {
    path: string;
    lastModifiedDate: string;
    changeFrequency:
        | "never"
        | "yearly"
        | "monthly"
        | "weekly"
        | "daily"
        | "hourly"
        | "always";
    priority: number;
};

const BUILD_DATE = new Date().toISOString();

const getSitemapLinks = (): Array<SiteMapRoute> => {
    const links: Array<SiteMapRoute> = [
        {
            path: Routes.HOME,
            lastModifiedDate: BUILD_DATE,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            path: Routes.RANTS([]),
            lastModifiedDate: BUILD_DATE,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            path: Routes.TOOLS([]),
            lastModifiedDate: BUILD_DATE,
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];

    BLOG_ARTICLES.forEach((article) => {
        links.push({
            path: Routes.RANT(article.slug),
            lastModifiedDate: article.date,
            changeFrequency: "monthly",
            priority: 0.8,
        } as SiteMapRoute);
    });

    TOOLS.forEach((tool) => {
        links.push({
            path: Routes.TOOL(tool.slug),
            lastModifiedDate: BUILD_DATE,
            changeFrequency: "monthly",
            priority: 0.8,
        } as SiteMapRoute);
    });

    return links;
};

export const generateSiteMapXML = (basePath: string) => {
    const routes = getSitemapLinks();

    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${routes
         .map(({ path, lastModifiedDate, changeFrequency, priority }) => {
             return `
       <url>
           <loc>${basePath}${path}</loc>
           <lastmod>${lastModifiedDate}</lastmod>
           <changefreq>${changeFrequency}</changefreq>
           <priority>${priority}</priority>
       </url>
     `;
         })
         .join("")}
   </urlset>
 `;
};
