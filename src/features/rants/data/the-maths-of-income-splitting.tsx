import {
    BlogHeading,
    BlogParagraph,
    BlogSubHeading,
} from "@/components/ui/blog";
import { BlogData } from ".";

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
            <BlogParagraph>TODO</BlogParagraph>
            <BlogHeading>TODO</BlogHeading>
            <BlogParagraph>TODO</BlogParagraph>
            <BlogSubHeading>TODO</BlogSubHeading>
            <BlogParagraph>TODO</BlogParagraph>
        </>
    );
}

export default TheMathsOfIncomeSplitting;
