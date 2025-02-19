import { Link } from "@/components/ui/link";
import { Github, LinkedIn } from "@/components/ui/icons";

function Footer() {
    return (
        <footer className="mt-12 flex flex-col gap-4">
            <div className="flex flex-row gap-2">
                <Link
                    className="flex items-center"
                    external
                    href="https://github.com/samobrien13"
                >
                    <Github />
                </Link>
                <Link
                    className="flex items-center"
                    external
                    href="https://www.linkedin.com/in/samobrien13"
                >
                    <LinkedIn />
                </Link>
            </div>
            <p>© {new Date().getFullYear()} MIT Licensed</p>
        </footer>
    );
}

export { Footer };
