import { Link } from "@/components/ui/link";
import { ThemeButton } from "../theme-button";

function Navbar() {
    return (
        <aside className="-ml-[8px] mb-16 tracking-tight">
            <div className="lg:sticky lg:top-20">
                <nav
                    className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
                    id="nav"
                >
                    <div className="flex flex-1 flex-row pr-10">
                        <Link
                            href="/"
                            className="rounded-full bg-primary px-3 py-2"
                        >
                            TiL
                        </Link>
                        <Link href="/rants" className="px-3 py-2">
                            rants
                        </Link>
                        <Link href="/tools" className="px-3 py-2">
                            tools
                        </Link>
                    </div>
                    <ThemeButton />
                </nav>
            </div>
        </aside>
    );
}

export { Navbar };
