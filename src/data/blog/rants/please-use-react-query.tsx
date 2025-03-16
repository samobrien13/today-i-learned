import { BlogParagraph } from "@/components/ui/blog";
import { CodeBlock } from "@/components/ui/code-block";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";

export const PLEASE_USE_REACT_QUERY: BlogData = {
    title: "Please use React Query!",
    description:
        "Learn how React Query can dramatically simplify your data fetching and state management",
    date: "2025-03-02",
    slug: "please-use-react-query",
    tags: ["engineering", "react"],
    image: {
        src: "/images/rants/react-query.webp",
        alt: "React Query",
    },
    component: <PleaseUseReactQuery />,
};

function PleaseUseReactQuery() {
    return (
        <>
            <BlogParagraph>
                I have been doing a round of interviews recently and as a part
                of that we review a take home challenge or own project, and a
                common theme seems to be that people are not using a state
                management library like{" "}
                <Link href="https://tanstack.com/query/latest" external>
                    React Query
                </Link>
                .
            </BlogParagraph>
            <BlogParagraph>
                Before the modern era of React,{" "}
                <Link href="https://redux.js.org/" external>
                    Redux
                </Link>{" "}
                was the go-to for state management. It was a great library that
                allowed you to manage your state in a predictable way. However,
                it was also quite horrible to work with given the amount of
                boilerplate required.
            </BlogParagraph>
            <BlogParagraph>
                Then along came libaries like{" "}
                <Link href="https://github.com/vercel/swr" external>
                    SWR
                </Link>{" "}
                and React Query that completely removed the need for complex
                state management. Redux adapated and introduced{" "}
                <Link
                    href="https://redux-toolkit.js.org/rtk-query/overview"
                    external
                >
                    RTK Query
                </Link>{" "}
                but I would only use this if you are already using Redux.
            </BlogParagraph>
            <BlogParagraph>
                Let&apos;s take a look at a simple example of fetching data
                without using React Query. We&apos;ll fetch a user and update
                their username.
            </BlogParagraph>
            <CodeBlock language="javascript">
                {`const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
const [updating, setUpdating] = useState(false);
const [updateError, setUpdateError] = useState(null);

const getUser = async (userId, signal) => {
    setLoading(true);

    try {
        const response = await fetch(\`/user/\${userId}\`, { signal });
        const data = await response.json();
        setData(data);
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    const abortController = new AbortController();

    getUser(userId, abortController.signal);

    return () => {
        abortController.abort();
    };
}, [userId]);

const updateUsername = async (userId, username) => {
    try {
        setUpdating(true);
        await fetch(\`user/\${userId}\`, {
            method: "PUT",
            body: JSON.stringify({ username }),
        });
        getUser(userId);
    } catch (error) {
        setUpdateError(error);
    } finally {
        setUpdating(false);
    }
};`}
            </CodeBlock>
            <BlogParagraph>
                As you can see, there are useStates all over the place to manage
                the loading state, error state, data state, updating state and
                update error state. We have to manually manage the loading state
                and error state in the getUser function which can lead to a lot
                of bugs if you don&apos;t handle it exactly right. We also need
                to handle re-fetching the user when the username is updated.
                This is trivial in this example but if your getUser query was
                used in a different component then you would need to use a
                context or prop drilling to get the updated data.
            </BlogParagraph>
            <BlogParagraph>
                Note that we also added an abort controller to prevent race
                conditions if the user id changes. This is a lot to get right
                every time you need to fetch data.
            </BlogParagraph>
            <BlogParagraph>
                Let&apos;s take a look at the same example but using React
                Query.
            </BlogParagraph>
            <CodeBlock language="javascript">
                {`export const useUser = (userId) => {
    return useQuery({
        queryKey: ["User"],
        queryFn: () => {
            const response = await fetch(\`/user/\${userId}\`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data);
            }

            return data;
        },
    });
};

export const useUpdateUsername = (userId) => {
    return useMutation({
        mutationFn: (username) => {
            return fetch(\`/user/\${userId}\`, {
                method: "PUT",
                body: JSON.stringify({ username }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['User'],
            });

        }
    });
};

const { data, error, isPending } = useUser(userId);
const { mutate, isLoading: isUpdating } = useUpdateUsername(userId);`}
            </CodeBlock>
            <BlogParagraph>
                In this simple case we only need to write the logic for fetching
                the user and updating the username and React Query handles the
                rest. Then there&apos;s one line of magic with the
                invalidateQueries call. This will tell all instances of the
                useUser query to refetch the data, regardless of where it is
                called in your application.
            </BlogParagraph>
            <BlogParagraph>
                In addition just by using React Query this will also cache the
                user data for you across your application. This means that if
                you have multiple components that use the useUser query then
                they will all use the same data without you having to worry
                about it.
            </BlogParagraph>
            <BlogParagraph>And this is only the simple case!</BlogParagraph>
            <BlogParagraph>
                Want to have your data stored across sessions?
            </BlogParagraph>
            <CodeBlock language="javascript">
                {`import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});`}
            </CodeBlock>
            <BlogParagraph>
                Now all of your api calls will instantly have cache first
                persistance and automatically update as needed.
            </BlogParagraph>
            <BlogParagraph>
                Want to use it with Next.js server components?
            </BlogParagraph>
            <CodeBlock language="javascript">
                {`import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import User from './user'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['User'],
    queryFn: getUser,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <User />
    </HydrationBoundary>
  )
}`}
            </CodeBlock>
            <BlogParagraph>
                Add this to your server component and you will have your data
                prefetched and hydrated on the server, while retaining all of
                the benefits of React Query on the client side.
            </BlogParagraph>
            <BlogParagraph>
                Unlike Redux, which is a huge commitment to add to your project
                for simple use cases, React Query is a library that excels at
                both simple and complex use cases. It&apos;s a no brainer to use
                it in your project regardless of scale and should be installed
                at the first moment you need to fetch data.
            </BlogParagraph>
            <BlogParagraph>
                I am quite suprised at the lack of awareness around React Query
                given it is quite clearly recommended to not fetch data with
                useEffect in the{" "}
                <Link
                    href="https://react.dev/learn/build-a-react-app-from-scratch#data-fetching"
                    external
                >
                    React docs
                </Link>
                . But then again, I am also seeing people still using Create
                React App as well...
            </BlogParagraph>
        </>
    );
}
