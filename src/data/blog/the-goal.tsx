import { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { BlogData } from "@/data/blog";

export const THE_GOAL: BlogData = {
    title: "The Goal",
    description:
        "What is the goal of the software industry, and how AI will shift that goal.",
    date: "2026-05-17",
    slug: "the-goal",
    tags: [],
    image: {
        src: "/images/rants/",
        alt: "",
    },
    component: <TheGoal />,
};

// Write as a novel?

function TheGoal() {
    return (
        <>
            <BlogParagraph>
                What is the goal of the software industry? Much has been written
                about the enshittification phenomenon. For the last 20 years or
                so and since the explosion of SAAS, the goal of the software
                industry has been to make as much profit as possible, at any
                costs.
            </BlogParagraph>
            <BlogParagraph>
                Software is unlike the majority of industries that came before
                it. Running and operating costs of software are incredibly low
                relative to the amount of users on any given platform. Therefore
                the playbook has become to gather as many users as you can, then
                charge whatever you want and choose how big you want the margin.
            </BlogParagraph>
            <BlogParagraph>
                What if the goal of software was instead to be... useful?
            </BlogParagraph>
            <BlogHeading>The Goal</BlogHeading>
            <BlogParagraph>
                The Goal is a fictional tale rooted in truth, written by Eliyahu
                M. Goldratt. Despite being based in manufacturing, the takeaways
                from the book have forever applied to industries across the
                board.
            </BlogParagraph>
            <BlogHeading>Bottlenecks</BlogHeading>
            <BlogParagraph>
                A key component of the book talks about bottlenecks. The plant
                has a couple of machines that control the output of the entire
                production line. Make any improvements to efficiencies wherever
                else you&apos;d like, and it won&apos;t make any difference to
                the end result. In fact, one learning from the book is actually
                that increasing in efficiencies in a non-bottleneck actually
                hurts the rest of the production line by raising inventory.
            </BlogParagraph>
            <BlogParagraph>
                Throughout my career, writing code has always been the easiest
                part of Software Engineering. Deciding what to build and how to
                do it, and agreeing on that with stakeholders has, and will
                continue to be, one of the bottlenecks. The other bottleneck is
                deciding when a feature is ready to release, that is deciding
                when it meets the requirements.
            </BlogParagraph>
            <BlogParagraph>
                By speeding up the part in the middle, you increase the demand
                on working out what to build and you increase the amount of time
                spent on reviewing, testing, and reworking features before
                pushing them live.
            </BlogParagraph>
            <BlogParagraph>
                There&apos;s a time and a place for speed. Early on in a startup
                or greenfield feature can be a magical time, when you have a
                clear direction and just need to knuckle down and get the thing
                out the door. This phase has always been fast, with and without
                AI.
            </BlogParagraph>
            <BlogHeading>The New Goal</BlogHeading>
            <BlogParagraph>
                With the introduction of AI, we may have even lost sight of the
                goal of making money. The promise of AI is that you can ship
                more features, faster. But does this actually serve the goal of
                making more money?
            </BlogParagraph>
            <BlogParagraph>
                Where are the companies that exist merely to serve their users?
                Build a feature just because it&apos;s nice to use, rather than
                to sell more stuff.
            </BlogParagraph>
        </>
    );
}

export default TheGoal;

