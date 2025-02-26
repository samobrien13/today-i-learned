import { Link } from "@/components/ui/link";
import Routes from "@/constants/Routes";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <section className="flex flex-1 flex-col gap-12 text-center md:justify-center md:pb-20">
            <h1 className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-center font-mono text-5xl leading-relaxed text-transparent">
                Today I Learned
            </h1>
            <p>A collection of my creations</p>
            <div className="flex flex-row items-center justify-center gap-4">
                <Button asChild variant="secondary">
                    <Link href={Routes.RANTS([])}>
                        {/* this is to override the default link mono font, need a better way to have a button link */}
                        <div
                            style={{
                                viewTransitionName: "tab-rants",
                            }}
                        >
                            Rants
                        </div>
                    </Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href={Routes.TOOLS([])}>
                        <div
                            style={{
                                viewTransitionName: "tab-tools",
                            }}
                        >
                            Tools
                        </div>
                    </Link>
                </Button>
            </div>
        </section>
    );
}
