const Routes = {
    HOME: "/",
    RANTS: "/rants",
    RANT: (slug: string) => `/rants/${slug}`,
    TOOLS: "/tools",
    TOOL: (slug: string) => `/tools/${slug}`,
};

export default Routes;
