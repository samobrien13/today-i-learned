import Link from "next/link";

export default function Home() {
    return (
        <section className="flex-1">
            <Link href="/thai-time-converter">
                <h2>Thai Time Converter</h2>
            </Link>
        </section>
    );
}
