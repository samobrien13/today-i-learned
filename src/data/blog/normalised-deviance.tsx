import {
    BlogHeading,
    BlogParagraph,
    BlogSubHeading,
} from "@/components/ui/blog";
import { BlogData } from "@/data/blog";

export const NORMALISED_DEVIANCE: BlogData = {
    title: "Normalised Deviance in Software Development",
    description:
        "What is normalised deviance, how does it apply to software development, and how can we avoid it?",
    date: "2026-03-01",
    slug: "normalised-deviance",
    tags: ["engineering"],
    image: {
        src: "/images/rants/normal.png",
        alt: "A graph showing a normal distribution with a twist",
    },
    component: <NormalisedDeviance />,
};

function NormalisedDeviance() {
    return (
        <>
            <BlogParagraph>
                Normalised deviance is a term coined by sociologist Diane
                Vaughan in her book &quot;The Challenger Launch Decision&quot;
                to describe the phenomenon where people become accustomed to
                deviant behaviour and start to see it as normal. This can lead
                to a culture of complacency and a lack of accountability, which
                can have disastrous consequences. While usually applied to the
                field of aviation, I think this concept is ever present within
                software development and it&apos;s organisations, and it&apos;s
                important to recognise it and take steps to avoid it.
            </BlogParagraph>
            <BlogHeading>What is Normalised Deviance?</BlogHeading>
            <BlogParagraph>
                Normalised deviance occurs when people become so accustomed to
                deviant behaviour that they start to see it as normal.{" "}
            </BlogParagraph>
            <BlogParagraph>
                Some examples I have seen over the years include:
                <ul>
                    <li>
                        Production, staging and development environments all
                        connecting to a production CRM instance.
                    </li>
                    <li>
                        Hardcoding API keys and secrets in code, with if else
                        statements for the environment
                    </li>
                    <li>Manually re-running failed jobs in a queue</li>
                    <li>
                        Commenting out code in order to make your local
                        environment work
                    </li>
                </ul>
            </BlogParagraph>
            <BlogHeading>How to Avoid Normalised Deviance</BlogHeading>
            <BlogSubHeading>New Starters</BlogSubHeading>
            <BlogParagraph>
                New starters are a great opportunity to avoid normalised
                deviance. They bring a fresh perspective and can often spot
                things that others have become blind to. It&apos;s important to
                encourage new starters to ask questions and challenge the status
                quo, and to create an environment where they feel safe to do so.
            </BlogParagraph>
            <BlogParagraph>
                If a new starter even gives a hint of discomfort at the mention
                of something, take note and investigate further. It may be an
                indictaion of a bigger problem.
            </BlogParagraph>
        </>
    );
}

export default NormalisedDeviance;
