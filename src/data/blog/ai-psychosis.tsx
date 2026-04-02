import { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";

export const AI_PSYCHOSIS: BlogData = {
    title: "AI Psychosis",
    description: "The death of thinking is taking us on a road to nowhere.",
    date: "2026-03-28",
    slug: "ai-psychosis",
    tags: ["ai"],
    image: {
        src: "/images/rants/psychosis.png",
        alt: "The voices in my head are all telling me to change.",
    },
    component: <AiPsychosis />,
};

function AiPsychosis() {
    return (
        <>
            <BlogParagraph>
                &quot;AI psychosis (or chatbot psychosis) is an emerging
                phenomenon where intensive interaction with AI chatbots triggers
                or amplifies delusional beliefs, paranoia, or a loss of touch
                with reality in susceptible individuals.&qout; - Google AI
                Overview
            </BlogParagraph>
            <BlogParagraph>
                I agree with all of this, except for the word susceptible.
            </BlogParagraph>
            <BlogParagraph>
                We&apos;ve been playing the generative AI game for more than 3
                years now (ChatGPT was released in November 2022). The adoption
                rate has been unparalleled when compared to any other
                technology, at least in my lifetime.
            </BlogParagraph>
            <BlogParagraph>
                In recent history, the metaverse failed to gain any traction
                among the masses,
                <Link
                    external
                    href="https://www.esafety.gov.au/research/the-metaverse"
                >
                    with as little as 4%
                </Link>{" "}
                of the population having participated. VR technology peaked with
                the game Beat Saber.
            </BlogParagraph>
            <BlogParagraph>
                Interest in cryptocurrency arguably peaked in the initial wave
                of adoption in 2017, before it became increasingly taken over by
                scams. Actual use of the technology outside of speculation is
                still yet to be realised.
            </BlogParagraph>
            <BlogParagraph>
                Generative AI has been markedly different. Nearly 100% of the
                corporate world has adopted AI in at least some capacity. A
                staggering amount of human thinking is now offloaded to this
                technology.
            </BlogParagraph>
            <BlogHeading>Going slow is a feature, not a bug</BlogHeading>
            <BlogParagraph>
                Let&apos;s talk about the upsides. So far, it looks like AI
                might increase productivity in some areas, sometimes. Ask any
                real engineer how they use AI and it is a heavily supervised
                process, with the majority able to cite many occasions where
                they have gone back and forth for hours on something they could
                have learned in a similar amount of time.
            </BlogParagraph>
            <BlogParagraph>
                Ok, lets say we can now develop features twice as fast, great!
                That&apos;s twice as many features that will never get used.
                Writing code has never been the hard part. Working out what to
                build is. AI doesn&apos;t know, though it will try and tell you.
            </BlogParagraph>
            <BlogParagraph>
                Nothing of value was ever built in a day. There is a time and a
                place for failing fast, and using AI may remove some barriers
                for that specific niche. For everything else, strong
                consideration and intentional delivery always wins the longer
                game.
            </BlogParagraph>
            <BlogHeading>Self driving cars</BlogHeading>
            <BlogParagraph>
                Where else in life have we ever accepted 95% accurate is good
                enough? Despite several advancements since the original Tesla
                Autopilot in 2014, self driving cars are still not a reality.
                All cars still require a pilot. We have not applied such caution
                with AI. The effect of being right most of the time will
                compound over and over until the results are unrecognisable
                slop.
            </BlogParagraph>
            <BlogHeading>You are absolutely right!</BlogHeading>
            <BlogParagraph>
                The problem with AI is that it is good enough. To the untrained,
                AI mostly says things that are plausibly true. It is trained to
                agree with what you tell it. We see very publicly that CEOs
                everywhere now believe they themselves can ship production grade
                software.
            </BlogParagraph>
            <BlogParagraph>
                These are by no means people that you would define as
                &quot;susceptible&quot;, but it turns out that it is human
                nature to feel good when someone agrees with you. You always
                need people around you to tell you that you&apos;re an idiot
                when it&apos;s warranted.
            </BlogParagraph>
            <BlogParagraph>
                Ever asked a therapy type question to an AI chatbot? They sure
                have the answer for you. Ever asked the same question to a
                therapist? Guaranteed they would not answer without asking a
                further 10 questions first.
            </BlogParagraph>
            <BlogParagraph>
                I recently watched on in horror as a Product Manager demoed
                themselves prompting Claude to connect to multiple systems with
                customer data just to fill in some input fields, and suggested
                that this could be used in a production system. Where was Claude
                to say that there are many ways to skin that cat (like you know,
                an API), and using me isn&apos;t one of them? Even if you
                insisted that a browser be used, anyone could whip up a
                playwright script in no time.
            </BlogParagraph>
            <BlogHeading>Atrophy</BlogHeading>
            <BlogParagraph>
                I have noticed in myself that heavy use of AI has already
                affected my ability to think. The more we go down this path the
                worse it will get. Everyone will be walking around with rotted
                brains. The mental health affects will pale in comparison to the
                introduction of smartphones and social media. We just won&apos;t
                know for another 10 years.
            </BlogParagraph>
            <BlogParagraph>
                There is a minimum amount of time you must spend to truely
                understand anything. With the use of AI you are either shifting
                that learning to the review phase (something no engineer ever
                enjoyed), or you&apos;re skipping it out entirely. Neither of
                these outcomes is desirable.
            </BlogParagraph>
            <BlogHeading>Conclusion</BlogHeading>
            <BlogParagraph>
                AI will become just another tool in the white collar tool belt.
                Certain niches will be created that can offload some of the dead
                work that no one wants to do. The data is murky, and the path
                unknown. What we know is what has worked until now, will
                continue to work in the future. Deep work and proper thinking
                cannot be replaced by this tool.
            </BlogParagraph>
            <BlogParagraph>
                Never have we run so hard towards a technology with no clear
                upside and so many obvious downsides.
            </BlogParagraph>
            <BlogParagraph>
                It is safest to preserve your brain and sit on the sidelines
                while it plays out. You won&apos;t get left behind, and you
                might be one of the few thinkers left that can clean up the
                mess.
            </BlogParagraph>
        </>
    );
}

export default AiPsychosis;
