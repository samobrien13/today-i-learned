import { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { BlogData } from ".";

export const DESIGN_SYSTEMS_FOR_AI_DEVELOPMENT: BlogData = {
    title: "Design systems for AI development",
    description:
        "Why a well defined design system matters more than ever when AI is writing your UI.",
    date: "2026-11-27",
    slug: "design-systems-for-ai-development",
    tags: ["design", "ai"],
    image: {
        src: "/images/rants/palette.png",
        alt: "Colour palette",
    },
    component: <DesignSystemsForAiDevelopment />,
};

function DesignSystemsForAiDevelopment() {
    return (
        <>
            <BlogParagraph>Intro</BlogParagraph>
            <BlogHeading>Heading</BlogHeading>
            <BlogParagraph>Content</BlogParagraph>
            <BlogHeading>Conclusion</BlogHeading>
            <BlogParagraph>Content</BlogParagraph>
        </>
    );
}

export default DesignSystemsForAiDevelopment;
