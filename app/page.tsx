import { Link } from "@/components/ui/link";
import Routes from "@/constants/Routes";
import { Button } from "@/components/ui/button";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Home() {
    return (
        <section className="flex flex-1 flex-col gap-12 text-center md:justify-center md:pb-20">
            <h1 className="bg-linear-to-r from-primary to-primary-foreground bg-clip-text text-center font-mono text-5xl leading-relaxed text-transparent">
                Today I Learned
            </h1>
            <p>A collection of my creations</p>
            <div className="flex flex-row items-center justify-center gap-4">
                <ViewTransition name="tab-rants">
                    <Button asChild variant="secondary">
                        <Link href={Routes.RANTS([])}>Rants</Link>
                    </Button>
                </ViewTransition>
                <ViewTransition name="tab-tools">
                    <Button asChild variant="secondary">
                        <Link href={Routes.TOOLS([])}>Tools</Link>
                    </Button>
                </ViewTransition>
            </div>
        </section>
    );
}
