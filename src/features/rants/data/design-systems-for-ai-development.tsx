import { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { BlogData } from ".";
import { Link } from "@/components/ui/link";

export const DESIGN_SYSTEMS_FOR_AI_DEVELOPMENT: BlogData = {
    title: "Design systems for AI development",
    description: "Why a well defined design system matters more than ever.",
    date: "2026-11-27",
    slug: "design-systems-for-ai-development",
    tags: ["design", "ai"],
    image: {
        src: "/images/rants/ai-design-system.jpg",
        alt: "A robotic arm painting UI components onto a holographic screen",
    },
    component: <DesignSystemsForAiDevelopment />,
};

function DesignSystemsForAiDevelopment() {
    return (
        <>
            <BlogParagraph>
                Now that AI development seems here to stay, it&apos;s time to
                sort out some of the details for making it work in the best
                possible ways. One area of focus for me has been design
                consistency. Left to it&apos;s own devices, AI will happily
                create hundreds of new bespoke components for each feature you
                build, leaving a mess of code that will feel inconsistent to
                users.
            </BlogParagraph>
            <BlogParagraph>
                Fortunately, I&apos;ve found some sure fire ways of keeping the
                consistency.
            </BlogParagraph>
            <BlogHeading>Heuristics</BlogHeading>
            <BlogParagraph>
                Firstly, you need some well defined rules for when to stick to
                the design system, and when to stray. Depending on the size of
                your project and company, this can have many levels to it. For a
                small project you probably only need feature components and
                global components. Across multiple projects you should have a
                centralised design system on top of that.
            </BlogParagraph>
            <BlogParagraph>
                To decide where a component should sit requires two questions to
                be answered. If a component is highly complex, then it should
                generally belong at the top level design system. This allows the
                complexity to be abstracted and contained within the design
                system itself and allows for maximum re-use. It also allows for
                a strong accesibility focus within the design system without the
                feature code needing to worry as much about it. If a component
                to be used across multiple features but not multiple projects
                then it belongs at the project level. If a component should be
                consistent across the whole company then obviously it will
                belong in the design system. Otherwise every component can be
                contained to the feature folder that it&apos;s used in. I find
                that{" "}
                <Link
                    href="https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md"
                    external
                >
                    bulletproof react
                </Link>
                helps maintain this structure, and is documented well enough for
                agents to understand.
            </BlogParagraph>
            <BlogHeading>Base</BlogHeading>
            <BlogParagraph>
                Current AI models are exceptional at accesibility and they
                certainly know more than I ever have. It is usually quite safe
                to defer this part to the agents, and they will do a better job
                than the majority of the internet that precedes us. That being
                said, there is still a place for the experts.
            </BlogParagraph>
            <BlogParagraph>
                Choose an unstyled component library to underpin your design
                system and stick with it. Any of{" "}
                <Link href="https://base-ui.com/" external>
                    Base UI
                </Link>
                ,{" "}
                <Link href="https://www.radix-ui.com/" external>
                    Radix
                </Link>{" "}
                or <Link href="https://react-aria.adobe.com/">React Aria</Link>{" "}
                are suitable choices. With a well crafted system it is
                relatively easy for AI to refactor between base libraries,
                should the need ever arise. All of these libraries make building
                highly complex interactions straigtforward, giving you the
                perfect building blocks to build your own ShadCN, without
                necessarily looking like every other ShadCN website.
            </BlogParagraph>
            <BlogHeading>Context</BlogHeading>
            <BlogParagraph>
                A general rule for the context needed for a repository is to
                provide enough detail for one level above and one level below. A
                frontend needs to know about an API that it calls, but not the
                details beyond that. It needs to know where the design system is
                located and how to use it, but can skip over the implementation
                details. The design system itself should know about its
                consumers, and the building block library that it wraps, but it
                will need minimal business context, if any.
            </BlogParagraph>
            <BlogHeading>Adding it all up</BlogHeading>
            <BlogParagraph>
                With these rules in place I have had a lot of success in making
                seismic changes safely at speed. A complex new component can be
                added to the design system with minimal human intervention, and
                you can be confident that it has the majority of the details you
                care about right the first time. Often it requires a quick
                visual check and some minor adjustments before shipping.
            </BlogParagraph>
            <BlogParagraph>
                Implementing the design system also becomes easier, as agents
                are much better at humans (at least the ones I have worked with)
                at recognising existing components and pushing back on designers
                when given the right information.
            </BlogParagraph>
            <BlogParagraph>
                Some amount of discipline is still required, it is still easy
                enough to work around a limitation with a quick !important or a
                copy and paste. Optimising the design system surface area for
                just enough customisability is the key. Unrestricted design will
                result in a fragmented user experience, but a system too
                restrictive may encourage the same.
            </BlogParagraph>
        </>
    );
}

export default DesignSystemsForAiDevelopment;
