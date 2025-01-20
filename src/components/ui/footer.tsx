import { ArrowUpRight } from "lucide-react";

function Footer() {
    return (
        <footer className="mt-16 flex flex-col gap-4">
            <a
                className="flex items-center transition-all hover:text-muted-foreground"
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/samobrien13"
            >
                <ArrowUpRight strokeWidth={1} />
                <p className="ml-2 h-7">github</p>
            </a>
            <p>© {new Date().getFullYear()} MIT Licensed</p>
        </footer>
    );
}

export { Footer };
