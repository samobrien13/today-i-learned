import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <section className="flex flex-1 flex-col justify-center gap-2">
            <title>Page not found | TIL</title>
            <h1 className="text-lg">Yeah, nah</h1>
            <p>Sorry, the page you were looking for was not found.</p>
            <Button asChild>
                <Link href="/">Back to home</Link>
            </Button>
        </section>
    );
};

export default NotFoundPage;
