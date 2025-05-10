import {
    BlogHeading,
    BlogListItem,
    BlogParagraph,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { CodeBlock } from "@/components/ui/code-block";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";
import { ArrowUpRight } from "lucide-react";

export const DOTFILES: BlogData = {
    title: "Dotfiles",
    description: "My dotfiles setup; Neovim, Zsh, and more",
    date: "2025-01-21",
    slug: "dotfiles",
    tags: ["engineering"],
    component: <Dotfiles />,
};

function Dotfiles() {
    return (
        <>
            <Link
                className="flex items-center"
                external
                href="https://github.com/samobrien13/dotfiles"
            >
                <ArrowUpRight strokeWidth={1} />
                <span className="ml-2 h-7">repository</span>
            </Link>
            <BlogParagraph>
                Dotfiles are hidden files that store configuration settings for
                various programs on your computer. They are often used to
                customize your system to your liking.
            </BlogParagraph>
            <BlogParagraph>
                Unlike some people, I don&apos;t like to keep absolutely
                everything in my dotfiles. There&apos;s some fun in setting up
                your system from scratch!
            </BlogParagraph>
            <BlogParagraph>I keep the following in my dotfiles:</BlogParagraph>
            <BlogUnorderedList>
                <BlogListItem>Neovim</BlogListItem>
                <BlogListItem>tmux</BlogListItem>
                <BlogListItem>Zsh</BlogListItem>
                <BlogListItem>SSH</BlogListItem>
                <BlogListItem>
                    VSCode (Mostly the Vim bindings in case I ever need to open
                    VSCode)
                </BlogListItem>
            </BlogUnorderedList>
            <BlogParagraph>
                These are configurations that I would struggle to replicate if I
                lost them. Having them in my dotfiles means I can easily get up
                and running. I opt not to keep things like my brew packages in
                my dotfiles and instead install them as I go through setup.
            </BlogParagraph>
            <BlogHeading>Setting up</BlogHeading>
            <BlogParagraph>
                To initialise my dotfiles on a new machine, I use the following
                commands to symlink my dotfiles to the correct locations:
            </BlogParagraph>
            <CodeBlock language="bash">
                {`git clone https://github.com/samobrien13/dotfiles.git\nbrew install stow\ncd dotfiles\nstow . -D $HOME`}
            </CodeBlock>
            <BlogHeading>Neovim</BlogHeading>
            <BlogParagraph>
                Neovim is my editor of choice, and I have a few plugins that I
                use to make my life easier. I use telescope to search for files.
                I use LSP to provide autocompletion and diagnostics. And I also
                have copilot for autocompletion. Fugitive is used for git
                actions. Other than that I don&apos;t really use anything
                outside the command line. Set up is heavily based on{" "}
                <Link href="https://www.youtube.com/watch?v=w7i4amO_zaE">
                    theprimeagen
                </Link>
                .
            </BlogParagraph>
            <BlogHeading>tmux</BlogHeading>
            <BlogParagraph>
                I make heavy use of tmux for managing my terminal windows. This
                includes the tmux-sessionizer script which allows me to lookup
                all my repos and open them in a new tmux session.
            </BlogParagraph>
            <BlogHeading>Aerospace</BlogHeading>
            <BlogParagraph>
                After years of getting by with the native OSX window manager, I
                finally found Aerospace. I had tried tools like BetterTouchTool
                but they were never really what I was looking for. I full screen
                everything, so being able to assign windows to any key plus the
                alt key is all I ever needed.
            </BlogParagraph>
        </>
    );
}
