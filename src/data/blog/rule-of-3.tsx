import { BlogParagraph } from "@/components/ui/blog";
import { BlogData } from "@/data/blog";

export const RULE_OF_3: BlogData = {
    title: "Rule of 3",
    description: "The rule of three and why DRY isn't always the best approach",
    date: "2026-02-21",
    slug: "rule-of-3",
    tags: ["programming", "refactoring"],
    image: {
        src: "/images/rants/triangle.png",
        alt: "Rule of 3",
    },
    component: <RuleOf3 />,
};

function RuleOf3() {
    return (
        <>
            <BlogParagraph>
                The &quot;rule of three&quot; in programming is a heuristic
                which states that a piece of code can be copied once, but if
                it&apos;s copied a third time, it should be refactored into a
                new abstraction.
            </BlogParagraph>
            <BlogParagraph>
                This principle helps in reducing code duplication and improving
                maintainability.
            </BlogParagraph>
        </>
    );
}

export default RuleOf3;
