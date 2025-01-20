import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ThemeButton } from "../theme-button";

const navItems = [
    {
        name: "about",
        path: "/",
    },
    {
        name: "blog",
        path: "/blog",
    },
    {
        name: "tools",
        path: "/tools",
    },
];

function Navbar() {
    return (
        <aside className="-ml-[8px] mb-16 tracking-tight">
            <div className="lg:sticky lg:top-20">
                <nav
                    className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
                    id="nav"
                >
                    <div className="flex flex-1 flex-row space-x-0 pr-10">
                        {navItems.map(({ name, path }) => {
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="relative m-1 flex px-2 py-1 align-middle transition-all hover:text-secondary-foreground"
                                >
                                    {name}
                                </Link>
                            );
                        })}
                    </div>
                    <ThemeButton />
                </nav>
            </div>
        </aside>
    );
}

export { Navbar };
