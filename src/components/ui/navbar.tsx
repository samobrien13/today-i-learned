import { Link } from "next-view-transitions";

const navItems = {
    "/": {
        name: "about",
    },
    "/blog": {
        name: "blog",
    },
    "/tools": {
        name: "tools",
    },
};

function Navbar() {
    return (
        <aside className="-ml-[8px] mb-16 tracking-tight">
            <div className="lg:sticky lg:top-20">
                <nav
                    className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
                    id="nav"
                >
                    <div className="flex flex-row space-x-0 pr-10">
                        {Object.entries(navItems).map(([path, { name }]) => {
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="hover:text-neutral-800 dark:hover:text-neutral-200 relative m-1 flex px-2 py-1 align-middle transition-all"
                                >
                                    {name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </aside>
    );
}

export { Navbar };
