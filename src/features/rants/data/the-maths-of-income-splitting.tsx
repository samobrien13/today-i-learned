import {
    BlogHeading,
    BlogListItem,
    BlogParagraph,
    BlogSubHeading,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { BlogData } from ".";
import { Link } from "@/components/ui/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { calculateEffectiveTaxRate, calculateTax } from "@/lib/tax";

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
                Portugal. More recently Poland introduced a higher tax-free
                threshold for parents with 2 or more kids, which functions
                similarly, although allows both parents to continue working.
            </BlogParagraph>
            <BlogParagraph>
                In Australia we have strong incentives for both parents to be
                working, with the Child Care Subsidy (CCS) working across all
                income levels. I will be using Australia&apos;s tax settings as
                of 2026 to run the numbers for the CCS against a potential
                income split. Income splitting will assume that one parent is
                not working at all and use the German model of which combines
                the two incomes and then averages them.
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
            <BlogParagraph>
                If income splitting was introduced it would come at the expense
                of... well something. The case for income splitting is usually
                made so that a parent can stay home, so the assumption is that
                this is an either or scenario, and that a childcare subsidy and
                income splitting could not be used in conjunction. Income
                splitting scenarios assume that one parent is earning $0.
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
            <BlogHeading>Income Splitting Comparison</BlogHeading>
            <BlogParagraph>
                Based on{" "}
                <Link href="https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents">
                    2025-26 tax rates
                </Link>
            </BlogParagraph>
            <Table className="mb-6">
                <TableHeader>
                    <TableRow>
                        <TableHead>Total Income</TableHead>
                        <TableHead>Total Tax without income split</TableHead>
                        <TableHead>
                            Effective tax rate without income split
                        </TableHead>
                        <TableHead>Total Tax with income split</TableHead>
                        <TableHead>
                            Effective tax rate with income split
                        </TableHead>
                        <TableHead>Absolute Savings</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>$80,000</TableCell>
                        <TableCell>{`$${calculateTax(80000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(80000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(40000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(40000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(80000) - calculateTax(40000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$100,000</TableCell>
                        <TableCell>{`$${calculateTax(100000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(100000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(50000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(50000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(100000) - calculateTax(50000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$120,000</TableCell>
                        <TableCell>{`$${calculateTax(120000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(120000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(60000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(60000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(120000) - calculateTax(60000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$140,000</TableCell>
                        <TableCell>{`$${calculateTax(140000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(140000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(70000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(70000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(140000) - calculateTax(70000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$160,000</TableCell>
                        <TableCell>{`$${calculateTax(160000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(160000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(80000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(80000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(160000) - calculateTax(80000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$180,000</TableCell>
                        <TableCell>{`$${calculateTax(180000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(180000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(90000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(90000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(180000) - calculateTax(90000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$200,000</TableCell>
                        <TableCell>{`$${calculateTax(200000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(200000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(100000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(100000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(200000) - calculateTax(100000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$220,000</TableCell>
                        <TableCell>{`$${calculateTax(220000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(220000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(110000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(110000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(220000) - calculateTax(110000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$240,000</TableCell>
                        <TableCell>{`$${calculateTax(240000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(240000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(120000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(120000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(240000) - calculateTax(120000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$260,000</TableCell>
                        <TableCell>{`$${calculateTax(260000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(260000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(130000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(130000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(260000) - calculateTax(130000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$280,000</TableCell>
                        <TableCell>{`$${calculateTax(280000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(280000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(140000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(140000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(280000) - calculateTax(140000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$300,000</TableCell>
                        <TableCell>{`$${calculateTax(300000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(300000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(150000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(150000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(300000) - calculateTax(150000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$320,000</TableCell>
                        <TableCell>{`$${calculateTax(320000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(320000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(160000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(140000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(320000) - calculateTax(160000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$340,000</TableCell>
                        <TableCell>{`$${calculateTax(340000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(340000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(170000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(170000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(340000) - calculateTax(170000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$360,000</TableCell>
                        <TableCell>{`$${calculateTax(360000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(360000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(180000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(180000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(360000) - calculateTax(180000) * 2}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>$380,000</TableCell>
                        <TableCell>{`$${calculateTax(380000)}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(380000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(190000) * 2}`}</TableCell>
                        <TableCell>{`${calculateEffectiveTaxRate(190000)}%`}</TableCell>
                        <TableCell>{`$${calculateTax(380000) - calculateTax(190000) * 2}`}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <BlogParagraph>
                In percentage terms it appears that income splitting works well
                for median earners, however in absolute terms such an
                arrangmement overwhelmingly favours ultra high income earners.
            </BlogParagraph>
            <BlogHeading>Child Care Subsidy Comparison</BlogHeading>
            <BlogParagraph>
                CCS adds the component of another wage so this calculation is
                done.
            </BlogParagraph>
            <BlogSubHeading>
                Childcare subsidy with both parents at median wage
            </BlogSubHeading>
            <Table className="mb-6">
                <TableHeader>
                    <TableRow>
                        <TableHead>Days of childcare</TableHead>
                        <TableHead>Total Combined Income</TableHead>
                        <TableHead>Subsidy</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>$18,000</TableCell>
                        <TableCell>80%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>$36,000</TableCell>
                        <TableCell>75%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>$54,000</TableCell>
                        <TableCell>70%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>4</TableCell>
                        <TableCell>$72,000</TableCell>
                        <TableCell>70%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>5</TableCell>
                        <TableCell>$90,000</TableCell>
                        <TableCell>65%</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <BlogSubHeading>Income splitting at the median wage</BlogSubHeading>
            <BlogParagraph>
                Splitting the median wage would assign earnings of $45,000 each.
            </BlogParagraph>
            <BlogSubHeading>
                Childcare subsidy at the median wage
            </BlogSubHeading>
            <BlogParagraph>1, 2, 3, 4 and 5 days a week.</BlogParagraph>
            <BlogHeading>Secondary effects of the childcare model</BlogHeading>
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
