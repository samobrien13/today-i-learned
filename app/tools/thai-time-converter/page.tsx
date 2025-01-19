import ThaiTimeConverter from "@/components/thai-time-converter";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thai Time Converter",
    description:
        "Learn to tell the time Thai style with this handy conversion tool",
};

export default function Page() {
    return (
        <section className="flex-1">
            <ThaiTimeConverter />
        </section>
    );
}
