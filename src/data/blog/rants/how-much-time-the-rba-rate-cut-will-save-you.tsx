import { Line } from "@/components/line";
import { MortgageCalculator } from "@/components/tools/mortgage-calculator";
import { BlogParagraph } from "@/components/ui/blog";
import { BlogData } from "@/data/blog";
import { calculatePaymentSet } from "@/lib/mortgage";

export const HOW_MUCH_TIME_THE_RBA_RATE_CUT_WILL_SAVE_YOU: BlogData = {
    title: "How much time the RBA rate cut will save you",
    description:
        "Learn how much quicker you can pay off your mortgage with the latest RBA rate cut.",
    date: "2025-02-18",
    slug: "how-much-time-the-rba-rate-cut-will-save-you",
    tags: ["finance"],
    component: <HowMuchTimeTheRbaRateCutWillSaveYou />,
};

const paymentSets = [
    calculatePaymentSet(500000, 6, 4000, 0),
    calculatePaymentSet(500000, 5.75, 4000, 0),
];

const maxSetLength = Math.max(
    ...paymentSets.map((paymentSet) => paymentSet.length),
);

function HowMuchTimeTheRbaRateCutWillSaveYou() {
    return (
        <>
            <BlogParagraph>
                Today&apos;s rate cut from the RBA is long awaited by many. With
                it will come a slew of talk about how much money the average
                punter will save. But if you&apos;re like me and want to
                maintain the same repayments regardless of the interest rate,
                you&apos;ll want to know how much quicker you can pay off your
                mortgage.
            </BlogParagraph>
            <BlogParagraph>
                Today&apos;s rate cut is 0.25%. With most retail interest rates
                around the 6% mark, this will be about a saving of about $80 a
                month, on a $500,000 mortgage.
            </BlogParagraph>
            <BlogParagraph>
                However, if we maintain the same repayments we can look at how
                this will affect the time it takes to pay off the mortgage.
            </BlogParagraph>
            <BlogParagraph>
                The following chart compares a $500,000 mortgage with $4000
                repayments at a 6% interest rate and what would be the new 5.75%
                interest rate.
            </BlogParagraph>
            {paymentSets.length > 0 ? (
                <Line paymentSets={paymentSets} maxSetLength={maxSetLength} />
            ) : null}
            <BlogParagraph>
                At the 6% interest rate, you&apos;ll pay off the mortgage in 16
                years and 6 months. At the new interest rate you&apos;ll reach
                the end a whole 4 months faster!
            </BlogParagraph>
            <BlogParagraph>
                Not quite as exciting as I&apos;d hope for, but maybe with a few
                more cuts we might be able to shave off a few years.
            </BlogParagraph>
            <BlogParagraph>
                Try out my mortgage calculator for yourself below:
            </BlogParagraph>
            <MortgageCalculator />
        </>
    );
}
