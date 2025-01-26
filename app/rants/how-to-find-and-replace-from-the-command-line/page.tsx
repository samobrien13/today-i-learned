import Blog, {
    BlogCode,
    BlogHeading,
    BlogListItem,
    BlogParagraph,
    BlogPre,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { Link } from "@/components/ui/link";
import { HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE } from "@/data/blog";
import { ArrowUpRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE;

function HowToTellTheTimeThaiStyle() {
    return (
        <Blog
            title={HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE.title}
            date={HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE.date}
            slug={HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE.slug}
        >
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
            <BlogPre>
                <BlogCode>
                    LC_ALL=C find ./ -type f -exec sed -i &apos;&apos; -e
                    &apos;s/replace text/replace text/&apos; {"{}"} \;
                </BlogCode>
            </BlogPre>
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
            <BlogPre>
                <BlogCode>
                    LC_ALL=C find ./ -type f -exec sed -i &apos;&apos; -e
                    &apos;s|replace/text|replace/text|&apos; {"{}"} \;
                </BlogCode>
            </BlogPre>
            <BlogParagraph>
                If modifying a large number of files, consider using xargs to
                avoid spawning a new sed process for each file:
            </BlogParagraph>
            <BlogPre>
                <BlogCode>
                    LC_ALL=C find ./ -type f -exec grep -Iq . {} \; -print |
                    xargs sed -i &apos;&apos; -e &apos;s/replace text/replace
                    text/&apos; {"{}"} \;
                </BlogCode>
            </BlogPre>
            <BlogParagraph>
                The grep command is used to filter out binary files, because
                we&apos;re writing code, and we have binary files in our
                project...
            </BlogParagraph>
            <BlogParagraph>
                Hopefully I never need to visit that stackoverflow thread
                again...
            </BlogParagraph>
        </Blog>
    );
}

export default HowToTellTheTimeThaiStyle;
