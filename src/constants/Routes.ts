const Routes = {
    HOME: "/",
    RANTS: (tags: string[]) =>
        `/rants${tags.length > 0 ? `?tags[]=${tags.join("&tags[]=")}` : ""}`,
    RANT: (slug: string) => `/rants/${slug}`,
    TOOLS: (tags: string[]) =>
        `/tools${tags.length > 0 ? `?tags[]=${tags.join("&tags[]=")}` : ""}`,
    TOOL: (slug: string) => `/tools/${slug}`,
};

export default Routes;
