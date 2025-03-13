import {
    BlogCode,
    BlogHeading,
    BlogListItem,
    BlogParagraph,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { CodeBlock } from "@/components/ui/code-block";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";
import { ArrowUpRight } from "lucide-react";

export const HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE: BlogData = {
    title: "How to find and replace from the command line",
    description:
        "Use sed on OSX to find and replace text across multiple files",
    date: "2025-01-25",
    slug: "how-to-find-and-replace-from-the-command-line",
    tags: ["engineering"],
    component: <HowToFindAndReplaceFromTheCommandLine />,
};

function HowToFindAndReplaceFromTheCommandLine() {
    return (
        <>
            <Link
                className="flex items-center"
                external
                href="https://stackoverflow.com/questions/11392478/how-to-replace-a-string-in-multiple-files-in-linux-command-line"
            >
                <ArrowUpRight strokeWidth={1} />
                <span className="ml-2 h-7">reference</span>
            </Link>
            <BlogParagraph>
                Once in a while, I find myself needing to replace a string in
                multiple files. There&apos;s no build in functionality in Neovim
                to do this but you can use the command line. Every time I search
                how to do it though I come across the above stackoverflow thread
                and spend half an hour working out how to do it.
            </BlogParagraph>
            <BlogParagraph>
                The following command will do the job on OSX:
            </BlogParagraph>
            <CodeBlock language="bash">
                {`LC_ALL=C find ./ -type f -exec sed -i '' -e & '/find text/replace text/' {} \\;`}
            </CodeBlock>
            <BlogUnorderedList>
                <BlogListItem>
                    <BlogCode>LC_ALL=C</BlogCode> is used to ensure consistent
                    behavior across different locales.
                </BlogListItem>
                <BlogListItem>
                    <BlogCode>find ./ -type f</BlogCode> Finds all files (
                    <BlogCode>-type f</BlogCode> ) in the current directory (./)
                    and its subdirectories. This could be modified to search
                    only in a specific directory e.g.{" "}
                    <BlogCode>find ./src -type f</BlogCode>
                </BlogListItem>
                <BlogListItem>
                    <BlogCode>
                        -exec sed -i &apos;&apos; -e &apos;s/replace
                        text/replace text/&apos; {"{}"} \;
                    </BlogCode>
                    This is where the magic happens. It uses the results of the
                    find command to replace the replace text with the replace
                    text.
                </BlogListItem>
            </BlogUnorderedList>
            <BlogHeading>Possible Issues and Fixes</BlogHeading>
            <BlogParagraph>
                If replace text or replace text contains slashes (/), use a
                different delimiter like |:
            </BlogParagraph>
            <CodeBlock language="bash">
                {`LC_ALL=C find ./ -type f -exec sed -i '' -e & 's|find/text|replace/text|' {} \\;`}
            </CodeBlock>
            <BlogParagraph>
                If modifying a large number of files, consider using xargs to
                avoid spawning a new sed process for each file:
            </BlogParagraph>
            <CodeBlock language="bash">
                {`LC_ALL=C find ./ -type f -exec grep -Iq . {} ; -print | xargs sed -i '' -e '/find text/replace text/' {} \\;`}
            </CodeBlock>
            <BlogParagraph>
                The grep command is used to filter out binary files, because
                we&apos;re writing code, and we have binary files in our
                project...
            </BlogParagraph>
            <BlogParagraph>
                Hopefully I never need to visit that stackoverflow thread
                again...
            </BlogParagraph>
        </>
    );
}
