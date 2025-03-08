import { BlogCode, BlogHeading, BlogParagraph } from "@/components/ui/blog";
import { CodeBlock } from "@/components/ui/code-block";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";

export const REACT_QUERY_WITH_SERVER_ACTIONS: BlogData = {
    title: "React Query with Server Actions",
    description: "Why Server Actions aren't the death of React Query",
    date: "2025-03-09",
    slug: "react-query-with-server-actions",
    tags: ["engineering", "react", "nextjs"],
    component: <ReactQueryWithServerActions />,
};

function ReactQueryWithServerActions() {
    return (
        <>
            <BlogParagraph>
                With the release of{" "}
                <Link
                    href="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations"
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
                Server components would allow you to fetch data on the server
                and then send it to the client. This would remove the need for
                the old way of doing client side fetches with React Query with{" "}
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
            <CodeBlock language="javascript">
                {`import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Posts from './posts'
import { getPosts } from './actions/posts'

export default async function PostsPage() {
  const queryClient = new QueryClient()
  const { "tags[]": tags } = await searchParams;
  const tagsArray = tags ? (Array.isArray(tags) ? tags : [tags]) : [];

  await queryClient.prefetchQuery({
    queryKey: ['posts', tagsArray],
    queryFn: () => getPosts(tagsArray),
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
                data without having to refetch the entire page. This feels like
                a best of both worlds
            </BlogParagraph>
            <BlogParagraph>
                Note that <BlogCode>getPosts</BlogCode> used here is actually a
                function that doubles as a server action!
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
            <CodeBlock language="javascript">
                {`'use client'

import { useActionState } from 'react'
import { createUser } from './actions'

const initialState = {
  message: '',
}

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState)

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
}}`}
            </CodeBlock>
            <BlogParagraph>
                I may just not be used to this pattern yet, but it feels
                horrible. <BlogCode>useEffect</BlogCode> is the devil.
                <BlogCode>useActionState</BlogCode> feels like a significant
                step backwards from <BlogCode>useMutation</BlogCode>.
            </BlogParagraph>
        </>
    );
}
