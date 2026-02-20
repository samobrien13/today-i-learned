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
                Don&apos;t Repeat Yourself (DRY) was a term coined by Andy Hunt
                and Dave Thomas in their book &quot;The Pragmatic
                Programmer&quot; in 1999. This principle is supposed to help in
                reducing code duplication and improving maintainability. But is
                it always the best approach?
            </BlogParagraph>
            <BlogParagraph>
                I tend to favour a different principle, which is that
                duplication is better than a bad abstraction. The problem with
                never repeating yourself is that most of the time it will lead
                to bad abstractions. When you only have two examples of
                something, you will abstract it in a way that fits those two
                examples. When the next example comes along, you will often find
                that your abstraction doesn&apos;t fit at all, and it becomes
                harder to fit things in. If there is never another example, then
                you haven&apos;t wasted any time.
            </BlogParagraph>
            <BlogParagraph>
                Almost always then you should duplicate code until you have at
                least three examples of something. By this time you can be much
                more confident that your abstraction will stand the test of
                time.
            </BlogParagraph>
            <BlogParagraph>
                It&apos;s the same reason I find things like Test Driven
                Development (TDD) to be a bit of a waste of time. When you start
                out developing a feature, you really have no idea what the final
                solution will look like. Writing tests first prescribes a
                certain design and will lead to a lot of wasted time as you have
                to rewrite tests and the feature as your design evolves. Better
                to let the code solidify and even go through a few iterations
                before writing tests that cement the behaviour of the code. Of
                course it takes some discipline to ensure you actually go back
                and write those tests, but it&apos;s a much more efficient way
                to work.
            </BlogParagraph>
        </>
    );
}

export default RuleOf3;
