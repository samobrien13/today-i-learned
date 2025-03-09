import { BlogCode, BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { CodeBlock } from "@/components/ui/code-block";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";

export const REACT_QUERY_WITH_SERVER_ACTIONS: BlogData = {
    title: "React Query with Server Actions",
    description: "Why Server Actions aren't the death of React Query",
    date: "2025-03-09",
    slug: "react-query-with-server-actions",
    tags: ["nextjs"],
    component: <ReactQueryWithServerActions />,
};

function ReactQueryWithServerActions() {
    return (
        <>
            <BlogParagraph>
                With the release of{" "}
                <Link
                    href="https://nextjs.org/docs/app/building-your-application/rendering/server-components"
                    external
                >
                    Server Components
                </Link>{" "}
                and then{" "}
                <Link
                    href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations"
                    external
                >
                    Server Actions
                </Link>{" "}
                in Next.js, it appeared as if{" "}
                <Link href="https://tanstack.com/query/latest" external>
                    React Query
                </Link>{" "}
                was going to become a thing of the past.
            </BlogParagraph>
            <BlogHeading>Server Components</BlogHeading>
            <BlogParagraph>
                Server components allow you to fetch data on the server and then
                send it to the client. This would remove the need for the old
                way of doing client side fetches with React Query with{" "}
                <BlogCode>useQuery</BlogCode>.
            </BlogParagraph>
            <BlogParagraph>
                This pattern has been amazing for performance as it allows you
                to fetch data on the server which is usually closer to the
                database and then send it to the client. This is a huge
                improvement compared to sending an empty page and then doing
                another round trip to fetch the data. Conceptually it&apos;s
                also quite nice to work with.
            </BlogParagraph>
            <BlogParagraph>
                While this is great for the initial page load, often you will
                want to fetch more data or change parameters after the page has
                loaded. The general pattern here would be to just refetch the
                entire page with the new data. This is fine for most cases but
                certainly isn&apos;t necessary.
            </BlogParagraph>
            <BlogParagraph>
                This is where React Query can be used to complement Server
                Components. Here we have a server component that makes use of{" "}
                <BlogCode>prefetchQuery</BlogCode> to fetch the data on the
                server.
            </BlogParagraph>
            <CodeBlock language="typescript" filename="app/posts/page.tsx">
                {`import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Posts from '@/components/posts'
import { getPosts } from '@/actions/posts'

export default async function PostsPage() {
  const queryClient = new QueryClient()
  const { tag } = await searchParams;

  await queryClient.prefetchQuery({
    queryKey: ['posts', tag],
    queryFn: () => getPosts(tag),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}`}
            </CodeBlock>
            <BlogParagraph>
                Now you can have a regular <BlogCode>useQuery</BlogCode> hook in
                your Posts component that will use the data that was prefetched
                on the server. Then if the user wants to change the tags you can
                use the same <BlogCode>useQuery</BlogCode> hook to fetch the new
                data and update the UI without having to refetch the entire
                page. This feels like a best of both worlds scenario.
            </BlogParagraph>
            <BlogParagraph>
                Note that <BlogCode>getPosts</BlogCode> used here is actually a
                function that doubles as a server action! Which we will make use
                of later.
            </BlogParagraph>
            <BlogHeading>Server Actions</BlogHeading>
            <BlogParagraph>
                Server Actions would allow you to create server side functions
                that could be called from the client side. This would remove the
                need for <BlogCode>useMutation</BlogCode>.
            </BlogParagraph>
            <BlogParagraph>
                Unfortunately, the current implentation of Server Actions feels
                quite clunky.
            </BlogParagraph>
            <BlogParagraph>
                A relatibely common pattern I have used is to fire a mutation
                and then fire a toast if the mutation was successful (or
                unsuccessful). This has always been quite simple with React
                Query, by using the <BlogCode>onSuccess</BlogCode> callback.
            </BlogParagraph>
            <BlogParagraph>
                The pattern for acheiving this just with Server Actions would
                look something like this:
            </BlogParagraph>
            <CodeBlock
                language="typescript"
                filename="app/create-user/page.tsx"
            >
                {`'use client'

import { useActionState } from 'react';
import { createUser } from '@/actions/user';
import { toast } from '@/components';

const initialState = {
  message: '',
};

export function Signup() {
    const [state, formAction, pending] = useActionState(createUser, initialState);

    useEffect(() => {
        if (state?.data) {
            toast.success('User created');
        }
    }, [state?.data]);

    return (
        <form action={formAction}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required />
            <button disabled={pending}>Sign up</button>
        </form>
    )
}`}
            </CodeBlock>
            <BlogParagraph>
                I may just not be used to this pattern yet, but it feels awful.{" "}
                <BlogCode>useEffect</BlogCode> is the devil and should almost
                never be used if it can be avoided.
                <BlogCode>useActionState</BlogCode> feels like a significant
                step backwards from <BlogCode>useMutation</BlogCode>.
            </BlogParagraph>
            <BlogParagraph>
                What server actions do enable is the ability to write functions
                that can be called from the client side. This is an idea
                conceptually the same as{" "}
                <Link href="https://trpc.io" external>
                    trpc
                </Link>
                . This concept was perfect as it enables you typesafe functions
                across the client and server boundary.
            </BlogParagraph>
            <BlogParagraph>
                From here it is an easy jump to using Server Actions from within
                React Query itself! Using the posts example from earlier we can
                create a Server Action to add a new post. The example uses
                drizzle ORM but you can use any database library or external
                fetch call depending on where you are fetching from.
            </BlogParagraph>
            <CodeBlock language="typescript" filename="actions/posts.ts">
                {`"use server";

import { posts } from "@/db/schema";
import { db } from "@/db";
import { getAnonymousId } from "@/lib/user";

export const addPost = async (content: string, tag: string) => {
    await db.insert(posts).values({
        tag: tag,
        content: content,
    });
};

export const getPosts = async (tag: string) => {
    return await db
        .select({
            count: count(),
        })
        .from(posts)
        .where(eq(posts.tag, tag));
};`}
            </CodeBlock>
            <BlogParagraph>
                And then use the Server Action in a regular React Query hook.
            </BlogParagraph>
            <CodeBlock language="typescript" filename="hooks/use-posts.ts">
                {`import { getPosts, addPost } from "@/actions/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePosts(tag: string) {
    return useQuery({
        queryKey: ["posts", tag],
        queryFn: () => getPosts(tag),
    });
}

export function useAddPost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["posts"],
        mutationFn: (content: string, tag: string) => addPost(content, tag),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
    });
}`}
            </CodeBlock>
            <BlogParagraph>
                There you have all the benefits of React Query with the
                simplicity of Server Actions!
            </BlogParagraph>
            <BlogParagraph>
                React has never been responsible for fetching data, and React
                Query is one of the best tools for that job. Server Components
                and Server Actions are great new tools within the React
                ecosystem, but they do not need to replace React Query.
            </BlogParagraph>
            <BlogHeading>Client Components</BlogHeading>
            <BlogParagraph>
                Another trend I have noticed from the Next.js mindset is that
                client components are seen as being a bad thing. I think this
                simply isn&apos;t true. There is a time and a place for client
                components; they are just another weapon in the toolkit.{" "}
            </BlogParagraph>
            <BlogParagraph>
                For example on this very post I use a client component for the
                likes and comments. The rest of the page is statically generated
                as that is the most performant way to do it. But the likes and
                comments are fetched with a <BlogCode>useQuery</BlogCode> hook
                that calls a Server Action to populate the data that it needs.
            </BlogParagraph>
            <BlogParagraph>
                This all happens on the client side because in this case I
                don&apos;t want to have any server side logic running as that
                would opt-out of static rendering and slow down the page load for the content that matters.
            </BlogParagraph>
            <BlogHeading>Conclusion</BlogHeading>
            <BlogParagraph>
                Server Components and Server Actions are great new tools that
                have been added to the Next.js ecosystem. They are not a
                replacement for React Query, but rather a complement to it.
            </BlogParagraph>
            <BlogParagraph>
                Other frameworks such as{" "}
                <Link href="https://astro.build" external>
                    Astro
                </Link>{" "}
                are also shaking things up with new ways of thinking such as{" "}
                <Link href="https://docs.astro.build/en/guides/server-islands/">
                    Server Islands
                </Link>
                . I have no doubt that{" "}
                <Link href="https://tanstack.com/start/latest" external>
                    TanStack Start
                </Link>{" "}
                will also be one to watch in this space. It will be interesting
                to see how these new paradigms develop and feed back into the
                React ecosystem.
            </BlogParagraph>
            <BlogParagraph>
                We will see if the Next.js or React team develops features such
                as <BlogCode>useActionState</BlogCode> further into something
                that is more usable. But for now, I think React Query is still
                the best tool for fetching data in React.
            </BlogParagraph>
        </>
    );
}
