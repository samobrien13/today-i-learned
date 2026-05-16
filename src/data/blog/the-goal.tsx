import { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";

export const THE_GOAL: BlogData = {
    title: "The Goal",
    description: "",
    date: "2026-05-17",
    slug: "the-goal",
    tags: [],
    image: {
        src: "/images/rants/",
        alt: "",
    },
    component: <TheGoal />,
};

function TheGoal() {
    return (
        <>
            <BlogHeading></BlogHeading>
            <BlogParagraph></BlogParagraph>
        </>
    );
}

export default TheGoal;