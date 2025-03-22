import { Link } from "@/components/ui/link";
import Routes from "@/constants/Routes";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Home() {
    return (
        <section className="flex flex-1 flex-col text-center md:justify-center md:pb-20">
            <Heading>Today I Learned</Heading>
            <div className="flex flex-col items-center justify-center gap-8">
                <p>A collection of creations</p>
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
            </div>
        </section>
    );
}
