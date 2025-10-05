const Routes = {
    HOME: "/" as const,
    RANTS: "/rants" as const,
    RANTS_WITH_TAGS: (tags: string[]) =>
        `/rants?tags[]=${tags.join("&tags[]=")}` as const,
    RANT: (slug: string) => `/rants/${slug}` as const,
    FEED: "/rants/feed" as const,
    TOOLS: "/tools" as const,
    TOOLS_WITH_TAGS: (tags: string[]) =>
        `/tools?tags[]=${tags.join("&tags[]=")}` as const,
    TOOL: (slug: string) => `/tools/${slug}` as const,
    ABOUT: "/about" as const,
};

export default Routes;
