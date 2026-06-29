import {
    BlogHeading,
    BlogListItem,
    BlogParagraph,
    BlogSubHeading,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { BlogData } from ".";
import { Link } from "@/components/ui/link";

export const THE_MATHS_OF_INCOME_SPLITTING: BlogData = {
    title: "The Maths of Income Splitting",
    description: "TODO",
    date: "2026-06-29",
    slug: "the-maths-of-income-splitting",
    tags: ["finance"],
    image: {
        src: "/images/rants/income-splitting.png",
        alt: "TODO",
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
                Portugal.
            </BlogParagraph>
            <BlogParagraph>
                In Australia we have strong incentives for both parents to be
                working, with the childcare subsidy working across all income
                levels. I will be using Australia&apos;s tax settings as of 2026
                to run the numbers for the Childcare Subsidy (CCS) against a
                potential income split. Income splitting will assume that one
                parent is not working at all and use the German model of which
                combines the two incomes and then averages them.
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
                employees.
            </BlogParagraph>
            <BlogHeading>The Maximal Case for income splitting</BlogHeading>
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
            <BlogSubHeading>
                Income splitting at $380,000 combined income
            </BlogSubHeading>
            <BlogParagraph>
                Each parent is assigned earnings of $190,000, which has an
                effective tax rate of TODO%.
            </BlogParagraph>
            <BlogSubHeading>
                Childcare subsidy at $380,000 + median wage{" "}
            </BlogSubHeading>
            <BlogParagraph>1, 2, 3, 4 and 5 days a week.</BlogParagraph>
            <BlogSubHeading>Income splitting at the median wage</BlogSubHeading>
            <BlogParagraph>
                Splitting the median wage would assign earnings of $45,000 each.
            </BlogParagraph>
            <BlogSubHeading>
                Childcare subsidy at the median wage
            </BlogSubHeading>
            <BlogParagraph>1, 2, 3, 4 and 5 days a week.</BlogParagraph>
            <BlogSubHeading>Sub effects of the childcare model</BlogSubHeading>
            <BlogParagraph>
                Working produces many benefits not accounted for in the income
                splitting model.
            </BlogParagraph>
            <BlogUnorderedList>
                <BlogListItem>Super and leave entitlements</BlogListItem>
                <BlogListItem>
                    Extra skilled jobs created through childcare which flows
                    back in to the tax system
                </BlogListItem>
            </BlogUnorderedList>
            <BlogHeading>Conclusion</BlogHeading>
            <BlogParagraph>
                Whilst the reality of both parents needing to work in the
                current day and age may not sit well with everyone, I believe
                the benefits are well justified. The CCS model also allows for
                greater flexibility to optimise finiancial benefit against
                spending time at home with your children, giving a best of both
                worlds feel.
            </BlogParagraph>
        </>
    );
}

export default TheMathsOfIncomeSplitting;
