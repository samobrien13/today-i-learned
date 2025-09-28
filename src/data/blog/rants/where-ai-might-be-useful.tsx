import { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { BlogData } from "@/data/blog";

export const WHERE_AI_MIGHT_BE_USEFUL: BlogData = {
    title: "Where AI might be useful",
    description: "How AI can help engineers outside of coding",
    date: "2025-05-10",
    slug: "where-ai-might-be-useful",
    tags: ["engineering", "ai"],
    image: {
        src: "/images/rants/lily36.jpg",
        alt: "AI",
    },
    component: <WhereAiMightBeUseful />,
};

function WhereAiMightBeUseful() {
    return (
        <>
            <BlogParagraph>
                We all know what the people we work with think of programming
                as. An insulting stereotype of code monkeys sitting all day
                writing code. You will find many sources talking about the
                average time spent coding vs. non-coding tasks, with around half
                of developers spending more than half of their time on
                non-coding tasks.
            </BlogParagraph>
            <BlogParagraph>
                We have seen plenty of AI innovation in the coding space, and
                the market is becoming saturated with ideas. The good ideas are
                starting to emerge, with CLI agents, AI PR reviewers and the
                original Copilot looking like they could be here to stay. But
                with model improvement appearing to stagnate it feels like any
                productivity gains in this space may have already been realised.
            </BlogParagraph>
            <BlogParagraph>But what about non-coding?</BlogParagraph>But the
            reality for most developers is far more collaborative and, dare I
            say, *talkative*. In fact, studies show that developers can spend up
            to half their time on tasks that aren't actually coding – things
            like meetings, debugging, code reviews, and yes, explaining their
            code to others. This is where code documentation often becomes a
            bottleneck. It's crucial for onboarding new team members,
            maintaining projects, and ensuring everyone understands the "why"
            behind the "what." But it's also a task often pushed to the bottom
            of the priority list, leading to outdated, incomplete, or simply
            non-existent docs. Enter Artificial Intelligence, a game-changer
            that's not just helping us write code, but also making sense of it.
            ### Bridging the Gap: Documentation for Everyone One of the most
            exciting applications of AI in documentation is its ability to
            translate complex code into understandable language for
            non-programmers. Imagine a project manager needing to understand a
            specific API call, or a marketing specialist wanting to grasp the
            functionality of a new feature. Traditionally, they'd have to tap a
            developer on the shoulder, interrupting their flow. With AI-powered
            documentation tools, this interaction can become seamless. These
            tools can analyze code and generate explanations in plain English,
            breaking down technical jargon and providing context. This empowers
            non-technical stakeholders to independently gain a deeper
            understanding of the product and its underlying mechanisms. It's
            like having a dedicated technical writer on call, always available
            and never bothered. This not only saves developers valuable time,
            but also fosters a more informed and collaborative environment. No
            more waiting for explanations; just clear, concise answers on
            demand. ### Beyond the Code: AI as a Developer's Co-Pilot The
            benefits of AI in documentation extend far beyond just simplifying
            things for non-programmers. Developers themselves stand to gain
            immensely. Think about those "non-coding" tasks that eat up so much
            time. AI can act as a powerful co-pilot, complimenting many of these
            essential, yet often tedious, activities: * **Automated Doc
            Generation:** Instead of manually writing comments and explanations,
            AI can analyze code and automatically generate initial documentation
            drafts. This could include function descriptions, parameter
            explanations, and even examples of usage. While human review remains
            essential, AI provides a significant head start.
            http://googleusercontent.com/image_generation_content/0 * **Keeping
            Docs Up-to-Date:** One of the biggest challenges with documentation
            is keeping it current as code evolves. AI can monitor code changes
            and flag documentation that might be out of sync, or even suggest
            updates automatically. This ensures that the documentation always
            reflects the latest state of the codebase. * **Intelligent Search
            and Retrieval:** Imagine being able to ask a natural language
            question about your codebase and instantly get the relevant
            documentation, code snippets, or even explanations of complex
            architectural decisions. AI-powered search makes this a reality,
            drastically reducing the time spent hunting for information. *
            **Code Review Enhancement:** AI can assist in code reviews by
            identifying areas that lack sufficient documentation or clarity,
            prompting developers to improve their explanations before merging
            code. * **Onboarding Efficiency:** New developers often spend weeks
            familiarizing themselves with an existing codebase. AI can provide
            personalized learning paths and instantly answer questions about the
            code, significantly shortening the onboarding period. ### The Future
            is Collaborative (and Documented!) AI isn't here to replace
            developers; it's here to empower them. By automating and
            streamlining many of the "non-coding" tasks, especially
            documentation, AI frees up developers to focus on what they do best:
            building innovative solutions. The future of software development is
            not just about writing elegant code, but also about creating a
            clear, understandable, and accessible ecosystem around that code. AI
            is the key to unlocking that future, transforming documentation from
            a chore into a seamless, intelligent part of the development
            workflow. And in doing so, it allows everyone, from the most
            seasoned engineer to the curious stakeholder, to speak the same
            language.
        </>
    );
}
