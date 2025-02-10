import { BlogParagraph } from "@/components/ui/blog";
import { CodeBlock } from "@/components/ui/code-block";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";

export const HOW_TO_TEST_NEXT_JS_APP_ROUTER: BlogData = {
    title: "How to test Next.js app router",
    description: "The best (and currently only) way to test Next.js app router",
    date: "2025-02-10",
    slug: "how-to-test-next-js-app-router",
    tags: ["testing", "engineering", "next.js"],
    component: <HowToTestNextJsAppRouter />,
};

function HowToTestNextJsAppRouter() {
    return (
        <>
            <BlogParagraph>
                Searching for a good solution to test a{" "}
                <Link href="https://nextjs.org/docs/app" external>
                    Next.js app router
                </Link>{" "}
                is something that I&apos;ve been struggling with for a while. I
                recently stumbled upon a tidbit hidden in the Next.js docs for{" "}
                <Link
                    href="https://nextjs.org/docs/app/building-your-application/testing/vitest"
                    external
                >
                    Vitest
                </Link>{" "}
                that suggests the answer. Next.js currently has no solution for
                testing app router, so they recommend using end-to-end testing.
            </BlogParagraph>
            <BlogParagraph>
                Rather than waiting around for a proper testing solution, I
                decided to follow the end-to-end testing path. One thing that
                makes this extremely powerful is being about to use Vercel for
                deployments. Also hidden in the Vercel docs is a section about
                running{" "}
                <Link href="https://vercel.com/guides/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment">
                    end-to-end tests on Vercel Preview Deployments
                </Link>
                . This is great because preview deployments are (mostly) the
                same as production deployments, making it a great way to test
                your application before deploying it to production, or before
                merging a PR.
            </BlogParagraph>
            <BlogParagraph>
                By skipping straight to the end-to-end testing path, you gain
                the advantage of being able to test the actual application,
                rather than just a static snapshot of the application using
                something like React Testing Library. But the disadvantage is
                that the tests are slower and more expensive to run. So you need
                to think more critically about what you&apos;re testing.
            </BlogParagraph>
            <BlogParagraph>
                I had previously used Vitest (Jest would also work similarly)
                for testing my Next.js app router using the following:
            </BlogParagraph>
            <CodeBlock language="typescript">
                {`describe(Page.name, () => {
  it('should throw not found error for invalid page type', async () => {
    await expect(() =>
      Page({
        params: {
            parent: 'not-a-valid-parent',
        },
      }),
    ).rejects.toEqual(new Error('NEXT_NOT_FOUND'));
  });

  it('should redirect if page not found', async () => {
    await expect(() =>
      Page({
        params: {
          parent: 'parent',
          id: 'does-not-exist',
        },
      }),
    ).rejects.toEqual(new Error('NEXT_REDIRECT')); // TODO: Where?
  });
});
            `}
            </CodeBlock>
            <BlogParagraph>
                Unfortunately due to the way that Next.js throws the errors
                that&apos;s as far as I could get. There&apos;s no way that I
                could see to even test where the redirect is going to. Because
                it&apos;s not officially supported, it has also been prone to
                break across versions.
            </BlogParagraph>
            <BlogParagraph>
                For now, I definitely recommend skipping straight to end-to-end
                testing with either{" "}
                <Link href="https://www.cypress.io/" external>
                    Cypress
                </Link>{" "}
                or{" "}
                <Link href="https://playwright.dev/" external>
                    Playwright
                </Link>
                . By plumbing these into your CI pipeline triggered by your
                Vercel preview deployments, you can test your application in the
                most realistic way. Hopefully Next.js will have better first
                class support for testing in the future.
            </BlogParagraph>
        </>
    );
}
