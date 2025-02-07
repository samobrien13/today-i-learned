import MortgageCalculator from "@/components/mortgage-calculator";
import { MORTGAGE_CALCULATOR } from "@/data/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: MORTGAGE_CALCULATOR.title,
    description: MORTGAGE_CALCULATOR.description,
};

export default function Page() {
    return (
        <section className="flex-1">
            <MortgageCalculator />
        </section>
    );
}
