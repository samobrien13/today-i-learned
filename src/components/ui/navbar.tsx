import { Link } from "@/components/ui/link";
import { ThemeButton } from "../theme-button";

const NAV_ITEMS = [
    {
        name: "home",
        path: "/",
    },
    {
        name: "rants",
        path: "/rants",
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
                    <div className="flex flex-1 flex-row pr-10">
                        {NAV_ITEMS.map(({ name, path }) => {
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="px-3 py-2"
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
