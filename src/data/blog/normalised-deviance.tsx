import {
    BlogHeading,
    BlogParagraph,
    BlogSubHeading,
} from "@/components/ui/blog";
import { BlogData } from "@/data/blog";

export const NORMALISED_DEVIANCE: BlogData = {
    title: "Normalised Deviance",
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
                deviant behaviour that they start to see it as normal. Deviance
                builds up and becomes so ingrained in the culture that people no
                longer question it.
            </BlogParagraph>
            <BlogParagraph>
                Some examples I have seen over the years include:
                <ul>
                    <li>
                        Production, staging and development environments all
                        connecting to the same production CRM instance.
                    </li>
                    <li>
                        Developers manually re-running failed jobs in a queue
                        each day
                    </li>
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
                indictaion of a problem going unnoticed.
            </BlogParagraph>
            <BlogSubHeading>Broken Windows Theory</BlogSubHeading>
            <BlogParagraph>
                Ever heard someone say, &quot;Oh, don&apos;t worry, that only
                happens in staging&quot;? This is a classic example of the
                broken windows theory, coined by criminologists George Kelling
                and James Wilson in 1982. The idea is that if you allow people
                to get away with petty crimes such as graffiti, litter and
                broken windows, it creates an environment where people are more
                likely to commit more serious crimes. In the same way, if you
                allow small inconvenience to linger and allow people to get away
                with small things going wrong, it creates a culture where people
                are more likely to allow bigger things to go wrong.
            </BlogParagraph>
            <BlogParagraph>
                It&apos;s important to address small issues as soon as they
                arise, and to create a culture where people feel comfortable
                raising concerns and reporting issues. This way you can prevent
                small issues from becoming big problems. Fixing small issues
                almost always pays for itself in the long run. That staging data
                you spend 10 minutes fixing saves the next person 2 hours of
                debugging and investigation. The README update you make to
                clarify a process saves the next new hire a day of confusion and
                asking questions.
            </BlogParagraph>
            <BlogSubHeading>Always be fixing</BlogSubHeading>
            <BlogParagraph>
                Whenever you go to work on something, always be looking for ways
                to improve it. Ask yourself, &quot;If we were designing this
                system today, would we accept this flaw?&quot; If the answer is
                no, then take some time to make it better. This doesn&apos;t
                mean you need to spend hours on it, but even a small improvement
                can make a big difference in the long run. Write a unit test.
                Add a comment. Turn a one liner into a sensibly named variable.
                Break up a large function into smaller ones. Each small
                improvement adds up over time, and the more people that adopt
                this mindset creates a snowball effect.
            </BlogParagraph>
            <BlogHeading>Conclusion</BlogHeading>
            <BlogParagraph>
                Normalised deviance is a dangerous phenomenon that can lead to a
                culture of complacency and a lack of accountability. A negative
                feedback loop can be created where people become so accustomed
                to deviant that even the most obvious and serious issues can be
                overlooked. By recognising the signs of normalised deviance and
                taking steps to avoid it, we can create a culture of
                accountability and continuous improvement, which can lead to
                better outcomes for everyone involved.
            </BlogParagraph>
        </>
    );
}

export default NormalisedDeviance;
