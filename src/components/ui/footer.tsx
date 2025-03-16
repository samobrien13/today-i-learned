import { Link } from "@/components/ui/link";
import { Github, LinkedIn } from "@/components/ui/icons";
import Routes from "@/constants/Routes";
import { RssIcon } from "lucide-react";

function Footer() {
    return (
        <footer className="mt-12 flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
                <Link external href="https://github.com/samobrien13">
                    <Github />
                </Link>
                <Link external href="https://www.linkedin.com/in/samobrien13">
                    <LinkedIn />
                </Link>
                <Link href={Routes.FEED}>
                    <RssIcon />
                </Link>
                <Link href={Routes.ABOUT} className="px-3 py-2">
                    about
                </Link>
            </div>
            <p className="font-mono">
                © {new Date().getFullYear()} MIT Licensed
            </p>
        </footer>
    );
}

export { Footer };
