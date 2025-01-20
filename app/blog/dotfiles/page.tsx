import Blog, {
    BlogCode,
    BlogHeading,
    BlogListItem,
    BlogParagraph,
    BlogPre,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { DOTFILES } from "@/data/blog";
import { ArrowUpRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: DOTFILES.metaTitle,
    description: DOTFILES.metaDescription,
};

function HowToTellTheTimeThaiStyle() {
    return (
        <Blog title={DOTFILES.title} date={DOTFILES.date} slug={DOTFILES.slug}>
            <a
                className="flex items-center transition-all hover:text-muted-foreground"
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/samobrien13/dotfiles"
            >
                <ArrowUpRight strokeWidth={1} />
                <p className="ml-2 h-7">repository</p>
            </a>
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
                commands to set up a bare git repository:
            </BlogParagraph>
            <BlogPre>
                <BlogCode>
                    git clone --bare https://github.com/samobrien13/dotfiles.git
                    $HOME/.cfg{"\n"}alias dotfiles=&apos;usr/bin/git
                    --git-dir=$HOME/.dotfiles/ --work-tree=$HOME&apos;{"\n"}
                    dotfiles checkout
                </BlogCode>
            </BlogPre>
            <BlogHeading>Neovim</BlogHeading>
            <BlogParagraph>
                Neovim is my editor of choice, and I have a few plugins that I
                use to make my life easier. I use telescope to search for files.
                I use LSP to provide autocompletion and diagnostics. And I also
                have copilot for autocompletion. Fugitive is used for git
                actions. Other than that I don&apos;t really use anything
                outside the command line. Set up is heavily based on{" "}
                <a href="https://www.youtube.com/watch?v=w7i4amO_zaE">
                    theprimeagen
                </a>
                .
            </BlogParagraph>
            <BlogHeading>tmux</BlogHeading>
            <BlogParagraph>
                I make heavy use of tmux for managing my terminal windows. This
                includes the tmux-sessionizer script which allows me to lookup
                all my repos and open them in a new tmux session.
            </BlogParagraph>
        </Blog>
    );
}

export default HowToTellTheTimeThaiStyle;
