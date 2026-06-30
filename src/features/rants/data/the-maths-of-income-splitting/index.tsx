import {
    BlogHeading,
    BlogListItem,
    BlogParagraph,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { BlogData } from "../";
import { Link } from "@/components/ui/link";
import IncomeSplittingTable from "./income-splitting-table";
import { ChildcareSubsidyCalculator } from "@/features/tools/components/childcare-subsidy-calculator";

export const THE_MATHS_OF_INCOME_SPLITTING: BlogData = {
    title: "The Maths of Income Splitting",
    description:
        "How an income splitting tax overhaul compares to the current Child Care Subsidy",
    date: "2026-06-29",
    slug: "the-maths-of-income-splitting",
    tags: ["finance"],
    image: {
        src: "/images/rants/split.png",
        alt: "Money flowing from the infinite money tree into two infinite money trees",
    },
    component: <TheMathsOfIncomeSplitting />,
};

function TheMathsOfIncomeSplitting() {
    return (
        <>
            <BlogParagraph>
                The topic of income splitting has gained some momentum lately.
                Having recently had my first child who is going into childcare
                soon, I thought it was time I crunched some numbers and compared
                the different approaches of childcare subsidation and
                incentivising stay at home parents.
            </BlogParagraph>
            <BlogParagraph>
                Income splitting is already possible in several countries around
                the world to varying degrees, including Germany, Ireland, and
                Portugal. More recently Poland introduced a higher tax-free
                threshold for parents with 2 or more kids, which functions
                similarly, although allows both parents to continue working.
            </BlogParagraph>
            <BlogParagraph>
                In Australia we have strong incentives for both parents to be
                working, with the Child Care Subsidy (CCS) being quite generous
                for people of all income levels. I will be using
                Australia&apos;s tax settings as of 2026 to run the numbers for
                the CCS against a potential income split. Income splitting will
                assume that one parent is not working at all and use the German
                model of which combines the two incomes and then averages them.
            </BlogParagraph>
            <BlogParagraph>
                If income splitting was introduced it would come at the expense
                of... well something. The case for income splitting is usually
                made so that a parent can stay home, so the assumption is that
                this is an either or scenario, and that a CCS and income
                splitting could not be used in conjunction.
            </BlogParagraph>
            <BlogParagraph>
                Where median wage is used it is taken from the{" "}
                <Link
                    external
                    href="https://www.abs.gov.au/statistics/labour/earnings-and-working-conditions/employee-earnings/latest-release"
                >
                    latest ABS data
                </Link>
                which gives a median wage of ~$90,000 a year for full time
                employees. Due to child care fees mostly being charged daily it
                favours those who can work full days to maximise their income
                while the child is in care. Many jobs are flexible enough to
                offer part time work which can be utilised to reduce the need
                for child care while still maintaining a healthy and worthwhile
                income.
            </BlogParagraph>
            <BlogHeading>The Maximal Case for Income Splitting</BlogHeading>
            <BlogParagraph>
                Income splitting is obviously most beneficial if you&apos;re
                lucky enough to be in the top tax bracket, currently 45% for
                earnings over $190,000. Thus any earnings taxed in this rate
                that can be shifted to your spouse will move you down to lower
                brackets and lower your effective tax rate. So the maximum
                benifit available would be for a combined income of $380,000,
                any further increase would see both parents taxed at the 45%
                rate.
            </BlogParagraph>
            <BlogHeading>Income Splitting Comparison</BlogHeading>
            <BlogParagraph>
                Based on{" "}
                <Link href="https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents">
                    2025-26 tax rates
                </Link>
            </BlogParagraph>
            <IncomeSplittingTable />
            <BlogParagraph>
                In percentage terms it appears that income splitting works well
                for median earners, however in absolute terms such an
                arrangmement overwhelmingly favours ultra high income earners.
            </BlogParagraph>
            <BlogHeading>Child Care Subsidy Comparison</BlogHeading>
            <BlogParagraph>
                Use the following calculator to compare different earning
                scenarios with the current CCS settings. Based on 2025-26{" "}
                <Link href="https://www.servicesaustralia.gov.au/your-income-can-affect-child-care-subsidy">
                    standard
                </Link>
                and{" "}
                <Link href="https://www.servicesaustralia.gov.au/your-number-children-care-can-affect-your-higher-child-care-subsidy">
                    higher
                </Link>{" "}
                rates
            </BlogParagraph>
            <ChildcareSubsidyCalculator
                title="Childcare Subsidy Calculator"
                description="Calculate your childcare subsidy percentage based on combined household income"
            />
            <br />
            <BlogParagraph>
                After playing around with various scenarios it&apos;s abundantly
                clear that the CCS is better financially for basically everyone.
                Some notable calculations for comparison.
            </BlogParagraph>
            <BlogUnorderedList>
                <BlogListItem>
                    With both parents as median wage earners, they are around
                    $30,000 better off with CCS compared to tax splitting
                </BlogListItem>
                <BlogListItem>
                    With the secondary worker on the median wage and working 3
                    days a week requiring 3 days of child care, the equivalent
                    point between the two systems for the primary earner is...
                    $280,000
                </BlogListItem>
                <BlogListItem>
                    If you have two or more children with a combined income of
                    over $367,563 then income splitting is better as you
                    don&apos;t receive the higher subsidy rate
                </BlogListItem>
            </BlogUnorderedList>
            <BlogParagraph>
                The only other justification for an income splitting model is
                for people who would stay home regardless, however the CCS model
                also allows for the secondary earner to work part time as a good
                compromise.
            </BlogParagraph>
            <BlogHeading>Secondary effects of the childcare model</BlogHeading>
            <BlogParagraph>
                Working produces many benefits not accounted for in the income
                splitting model.
            </BlogParagraph>
            <BlogUnorderedList>
                <BlogListItem>
                    Super and leave entitlements accrue if both parents continue
                    to work
                </BlogListItem>
                <BlogListItem>
                    Extra skilled jobs created through childcare which flows
                    back in to the tax system
                </BlogListItem>
                <BlogListItem>Better financial independence</BlogListItem>
            </BlogUnorderedList>
            <BlogHeading>Conclusion</BlogHeading>
            <BlogParagraph>
                Whilst the reality of both parents needing to work in the
                current day and age may not sit well with everyone, I believe
                the benefits are well justified. The CCS model also allows for
                greater flexibility to optimise financial benefit against
                spending time at home with your children, giving a best of both
                worlds feel.
            </BlogParagraph>
            <BlogParagraph>
                Adopting an income splitting model would likely require a
                complete overhaul of the tax system and there would be winners
                and losers. At face value the goal of allowing for more stay at
                home parents just doesn&apos;t seem to be helped by such a
                scheme except for those earning enough money to not need
                assistance in the first place.
            </BlogParagraph>
            <BlogParagraph>
                If you want to remove the financial burden of having children to
                encourage more people to have them, income splitting isn&apos;t
                likely to move the needle very far.
            </BlogParagraph>
        </>
    );
}

export default TheMathsOfIncomeSplitting;
