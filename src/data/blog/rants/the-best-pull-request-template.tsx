import { BlogParagraph } from "@/components/ui/blog";
import { CodeBlock } from "@/components/ui/code-block";
import { BlogData } from "@/data/blog";

export const THE_BEST_PULL_REQUEST_TEMPLATE: BlogData = {
    title: "The best pull request template",
    description: "Create a pull request template that people will actually use",
    date: "2025-03-08",
    slug: "the-best-pull-request-template",
    tags: ["engineering"],
    component: <TheBestPullRequestTemplate />,
};

function TheBestPullRequestTemplate() {
    return (
        <>
            <BlogParagraph>
                A good description on a pull request is essential for the
                reviewer to understand the changes that have been made. At a
                glance, it should tell the reviewer exactly what the changes are
                and how they can be tested. If these criteria are met, the
                reviewer can quickly assess the changes and provide feedback. If
                not, the reviewer will either need to spend more time
                understanding the changes, blindly approve the changes, or just
                ignore the pull request entirely.
            </BlogParagraph>
            <BlogParagraph>
                I have seen many articles on this topic which suggest requiring
                an entire novel for each pull request. While this might be
                useful for the reviewer to understand the changes, it is not
                practical for the developer to write this for every change. This
                will lead to requirements being ignored and the pull request
                template not actually being used.
            </BlogParagraph>
            <BlogParagraph>
                I stumbled upon this template at a previous company and have
                taken it with me and adjusted depending on the project.
            </BlogParagraph>
            <CodeBlock language="markdown">
                {`[Link to ticket](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

**Description of changes**

What does this pull request address and how?

**Checklist**

-   [ ] Tested on multiple browsers
-   [ ] Includes automated tests
-   [ ] Ready to be released to production

**Steps to test manually**

Any special instructions for reviewers

| Screenshots Before                                                                                                                         | Screenshots After                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Screen Shot 2020-05-29 at 11 17 37 AM](https://user-images.githubusercontent.com/4144/83203669-0e987a80-a19e-11ea-94c6-69cd857a79c8.png) | ![Screen Shot 2020-05-29 at 11 17 41 AM](https://user-images.githubusercontent.com/4144/83203681-15bf8880-a19e-11ea-9008-5c25d220acf2.png) |`}
            </CodeBlock>
            <BlogParagraph>That&apos;s it.</BlogParagraph>
            <BlogParagraph>
                At my current job I introduced this template without even
                telling anyone and people (mostly) just magically fill it out.
                Another template was tried in a different repo with the 1000
                checkboxes method and it was never used.
            </BlogParagraph>
            <BlogParagraph>
                Adjust these checkboxes to fit your project (just don&apos;t add
                too many).
            </BlogParagraph>
            <BlogParagraph>
                I generally believe that any other requirements you want
                satisfied should be enforced by the CI/CD pipeline. Code style
                checks should be solved by a linter and not a checkbox in a pull
                request. And if people want to nitpick about code style, they
                can have it added to the lint rules.
            </BlogParagraph>
            <BlogParagraph>
                Note that I have included a checkbox for automated tests because
                I don&apos;t really believe in arbitrary code coverage rules.
            </BlogParagraph>
            <BlogParagraph>
                Change the screenshots to anything else that will annoy people
                if they aren&apos;t properly replaced!
            </BlogParagraph>
            <BlogParagraph>
                Try this template out for yourself and let me know how you go!
            </BlogParagraph>
        </>
    );
}

export default TheBestPullRequestTemplate;
