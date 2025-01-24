import { ArrowUpRight } from "lucide-react";
import { Link } from "@/components/ui/link";

function Footer() {
    return (
        <footer className="mt-16 flex flex-col gap-4">
            <Link
                className="flex items-center"
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/samobrien13"
            >
                <ArrowUpRight strokeWidth={1} />
                <span className="ml-2 h-7">github</span>
            </Link>
            <p>© {new Date().getFullYear()} MIT Licensed</p>
        </footer>
    );
}

export { Footer };
