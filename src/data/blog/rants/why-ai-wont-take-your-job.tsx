import { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { Link } from "@/components/ui/link";
import Routes from "@/constants/Routes";
import { BlogData } from "@/data/blog";

export const WHY_AI_WONT_TAKE_YOUR_JOB: BlogData = {
    title: "Why AI (probably) won't take your job",
    description:
        "Why the world requires engineers and how to ensure you remain valuable",
    date: "2025-02-09",
    slug: "why-ai-wont-take-your-job",
    tags: ["ai", "engineering"],
    image: {
        src: "/images/rants/ai.webp",
        alt: "AI",
    },
    component: <WhyAiWontTakeYourJob />,
};

function WhyAiWontTakeYourJob() {
    return (
        <>
            <BlogParagraph>
                There&apos;s absolutely no doubt that AI has absolutely
                ingrained itself into our lives and shaken up the software
                industry. If you haven&apos;t been following along with the
                advances in AI technology you&apos;re doing yourself a
                disservice, but is AI going to replace you?
            </BlogParagraph>
            <BlogHeading>Copilot</BlogHeading>
            <BlogParagraph>
                When I first tried{" "}
                <Link href="https://github.com/features/copilot" external>
                    copilot
                </Link>
                , it was an awakening to be taking AI seriously. The joy that
                copilot brings is not something that can be replicated by any
                other tool.
            </BlogParagraph>
            <BlogParagraph>
                Since the initial release of copilot, we&apos;ve seen AI make
                supposed massive improvements. Every new model is better than
                the last etc. etc.
            </BlogParagraph>
            <BlogParagraph>
                But has this really been the case? Sure, copilot is better than
                no copilot, but is the copilot of today meaingfully better? I
                don&apos;t think so.
            </BlogParagraph>
            <BlogParagraph>
                Copilot shines at being a glorified autocomplete. It certainly
                makes writing code easier, but it&apos;s not a magic wand that
                can solve any problem.
            </BlogParagraph>
            <BlogParagraph>
                I especially enjoy using copilot for writing code in unfamiliar
                languages. What used to be a search through Ruby documentation
                is now just given to me in an instant without leaving my editor.
            </BlogParagraph>
            <BlogParagraph>
                But all to often, the suggestions are at best not what you want
                and at worst full of issues. I would hate to be a junior
                engineer at the moment because you wouldn&apos;t know what to do
                with the suggestions. Fundamental knowldge is hard to learn if
                you&apos;re reliant on copilot.
            </BlogParagraph>
            <BlogParagraph>
                For all level of developer, I think having a break from copilot
                is a good idea to ensure you&apos;re not always relying on it to
                solve your problems.
            </BlogParagraph>
            <BlogHeading>Prompt engineering</BlogHeading>
            <BlogParagraph>
                I have dabbled in trying to use prompt engineering to solve
                larger problems. I attempted to use{" "}
                <Link href="https://v0.dev/" external>
                    v0
                </Link>{" "}
                for my{" "}
                <Link href={Routes.TOOL("thai-time-converter")}>
                    Thai time converter tool
                </Link>{" "}
                . While I got given a basic UI, the underlying methods to
                convert the time were not accurate at all, so I still spend a
                significant amount of time trying to figure out how to get the
                correct output.
            </BlogParagraph>
            <BlogParagraph>
                This really sums it up. AI may get you 90% of the way there, and
                you either don&apos;t realise it&apos;s wrong and you&apos;re
                shipping a product that doesn&apos;t work, or you&apos;re
                spending time on fixing it. There&apos;s definitely time to be
                saved, but using AI for 100% of problems doesn&apos;t seem like
                it will save time in the long run.
            </BlogParagraph>
            <BlogHeading>Shortfalls</BlogHeading>
            <BlogParagraph>
                The thing I would love to see is an AI that can deeply
                understand a large codebase. All of the solutions I&apos;ve seen
                so far don&apos;t seem to hit the mark.
            </BlogParagraph>
            <BlogParagraph>
                The AI agents advertised to perform code reviews only seem to be
                catching simple mistakes and I&apos;ve seen some advertised that
                show the AI picking up simple linting errors, easily
                accomplished with existing tools.
            </BlogParagraph>
            <BlogParagraph>
                It has been nearly a year since{" "}
                <Link href="https://devin.ai/" external>
                    Devin
                </Link>{" "}
                was announced, and similar tools that were touted as a
                replacement for humans, and we&apos;re yet to see any real world
                impact. Even Devin is now marketed as an &qout;AI teammate&quot;
                as opposed to an actual replacement (a much better strategy!).
            </BlogParagraph>
            <BlogParagraph>
                I&apos;ve been pretty impressed with{" "}
                <Link href="https://supermaven.com/" external>
                    Supermaven
                </Link>{" "}
                as it seems to have a large context window indicating it has a
                decent understanding of the codebase, so it seems possible that
                we will see improvements in this space.
            </BlogParagraph>
            <BlogHeading>Can anyone be a developer now?</BlogHeading>
            <BlogParagraph>
                For all of the above reasons, I think the answer is no. But I do
                think the landscape is changing.
            </BlogParagraph>
            <BlogParagraph>
                If you split the software world into engineering and product, I
                think we&apos;re going to see the roles converge. AI is good
                enough for a non-engineer to get started on a project. But they
                will need to have a solid understanding of how to control an AI
                to get the outputs they want. This kind of understanding is an
                engineering trait. So while the barrier to entry is now lower to
                become an engineer, you&apos;ll still need to have a decent
                amount of expertise and be able to think like an engineer to see
                good results.
            </BlogParagraph>
            <BlogParagraph>
                For engineers, I think the best way to ensure you&apos;re
                valuable is to deeply understand the problems you&apos;re
                solving. This is true with or without AI. Don&apos;t just be
                someone who writes code, be someone who can solve problems.
                Solve problems for your users. In other words, learn to be a
                product manager. Learn to be a designer.
            </BlogParagraph>
            <BlogParagraph>
                There will also be a day in the near future where AI generated
                startups are in an absolute nightmare state and engineers will
                have to clean up the mess.
            </BlogParagraph>
            <BlogParagraph>
                One should not bury their head in the sand and hope for AI to go
                away, the cat is out of the bag. Embrace the change in the
                industry and use AI as the great tool that it is, and make sure
                you&apos;re providing value in ways above and beyond just
                writing code.
            </BlogParagraph>
            <BlogParagraph>
                I will be interested to see how this ages...
            </BlogParagraph>
        </>
    );
}

export default WhyAiWontTakeYourJob;
