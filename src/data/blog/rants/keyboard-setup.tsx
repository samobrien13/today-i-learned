import {
    BlogHeading,
    BlogListItem,
    BlogParagraph,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { Lily58 } from "@/components/keyboard";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";
import { ArrowUpRight } from "lucide-react";

export const KEYBOARD_SETUP: BlogData = {
    title: "Keyboard setup",
    description: "How to buy a custom keyboard in Australia",
    date: "2025-01-21",
    slug: "keyboard-setup",
    tags: ["engineering"],
    component: <KeyboardSetup />,
};

function KeyboardSetup() {
    return (
        <>
            <Link
                className="flex items-center"
                external
                href="https://github.com/samobrien13/lily58-config"
            >
                <ArrowUpRight strokeWidth={1} />
                <span className="ml-2 h-7">repository</span>
            </Link>
            <BlogParagraph>
                I recently interviewed a candidate and as a part of his
                &quot;Teach us anything&quot; section, he showed us all about
                his custom keyboard. This has sent me down a rabbit hole I never
                wanted to go down.
            </BlogParagraph>
            <BlogParagraph>
                I have always struggled with minor pain in my right wrist
                specifically after a big stint of coding. So it makes sense to
                start to future proof myself and invest in something that will
                help me in the long run.
            </BlogParagraph>
            <BlogParagraph>
                I had admired ThePrimeagen&apos;s Kinesis Advantage keyboard for
                a while, but looking at importing it into Australia, it ends up
                being close to $1000 AUD.
            </BlogParagraph>
            <BlogParagraph>
                Searching for other retailers in Australia yields next to
                nothing. I couldn&apos;t even find an ortholinear keyboard, let
                alone a split one. So this left me with no choice but to go down
                the custom route.
            </BlogParagraph>
            <BlogParagraph>
                I spent a few days researching different options and mostly
                decided that I wanted no part in assembling the smaller
                components. I have some experience with soldering though, so
                putting some pins on a microcontroller is no problem.
            </BlogParagraph>
            <BlogParagraph>
                I found most sites confusing and hard to work out what I needed.
                I eventually settled on Typeractive, as it seemed popular and
                had free shipping to Australia. They offered the partially
                assembled boards I was looking for, and have a reassuring
                interface showing (almost) everything you need to buy.
            </BlogParagraph>
            <BlogParagraph>
                I ended up choosing the Lily58. I wasn&apos;t yet convinced
                about layers and less keys so the larger option seemed like a
                better place to start. The following is what I ended up
                ordering:
            </BlogParagraph>
            <BlogUnorderedList>
                <BlogListItem>
                    Lily58 Wireless Partially Assembled PCB × 1
                </BlogListItem>
                <BlogListItem>Lily58 Case × 1</BlogListItem>
                <BlogListItem>nice!nano v2.0 × 2</BlogListItem>
                <BlogListItem>JWK JWICK Linear Switches × 6</BlogListItem>
                <BlogListItem>
                    EZ-Solder Machine Sockets and Headers × 2
                </BlogListItem>
                <BlogListItem>Lily58 Display Cover × 1</BlogListItem>
                <BlogListItem>DSA Keycaps × 6 (10 x 1u)</BlogListItem>
                <BlogListItem>DSA Keycaps × 1 (2 x 1u homing)</BlogListItem>
                <BlogListItem>DSA Keycaps × 1 (2 x 1.5u)</BlogListItem>
            </BlogUnorderedList>
            <BlogParagraph>
                I was actually hoping to go wired, so when it turned up it was
                kind of apparent it is only meant for wireless (though it does
                work with both boards powered by USB-C) and I had forgot to
                order the batteries. These were hard to track down elsewhere
                without incurring enormous shipping costs. I ended up ordering
                them from AliExpress, and hopefully they turn up in a few
                months.
            </BlogParagraph>
            <BlogParagraph>
                I don&apos;t mind the bare case but I think I would have
                preferred an enclosed option to keep the dust out.
            </BlogParagraph>
            <BlogParagraph>
                I highly recommend blank keycaps as you will be remapping the
                layout constantly and it is better to learn to touch type.
            </BlogParagraph>
            <BlogParagraph>
                Assembly was super straitforward. Just solder the EZ-Solder pins
                and connect it up.
            </BlogParagraph>
            <BlogParagraph>
                The nice!nano works with ZMK firmware, and I would recommend
                going straight to configuring it with code. The docs are great
                and there are plenty of good examples on the internet.
            </BlogParagraph>
            <BlogHeading>Layout</BlogHeading>
            <BlogParagraph>
                Given the drastic change in keyboard I decided it would be a
                good idea to throw away my QWERTY layout and start fresh. I
                looked at DVORAK and while I liked it, it ended up being too
                different and the symbol layout is poor (even Programmer Dvorak
                doesn&apos;t look great to me). There&apos;s also a lot of keys
                placed in places that are really awkward for Vim bindings, and
                remapping isn&apos;t really an option as the keys are
                intuitively named. Colemak looked good, although again the Vim
                bindings are awful, but fortunately Colemak DH all but solves
                this. Keys are all convenient and nicely placed for everything I
                use and it is somewhat similar to QWERTY so less overhead to
                learn.
            </BlogParagraph>
            <BlogParagraph>
                I used a combination of Keybr, MonkeyType and Ngram to learn. I
                would recommend about a week to get up to speed to at least be
                functional in a work environment. Once you get past about 30
                words per minute the cognitive burden of thinking about where
                each key is starts to go away. The average person types at about
                40 words per minute, so at this point you are already faster
                than Brian from marketing.
            </BlogParagraph>
            <BlogParagraph>
                From there I have been slowly tinkering with the rest of the
                layout. I move the symbols around based on some sort of
                intuitive sense, how often I use them and how easy it is for me
                to reach them. I don&apos;t mind using my pinky, but the top and
                bottom rows are hard for me so those 4 keys are reserved for the
                least used.
            </BlogParagraph>
            <BlogParagraph>
                Numbers I have left on the top row, but I have reordered them. I
                have odd numbers on the left and even on the right. With 1 and 0
                closer to the middle as they are the most used, especially in
                programming. I have left the symbols on their original number
                keys for continuity with QWERTY. With this layout you also get
                the added bonus of ( and ) being symmetrical on the index
                fingers.
            </BlogParagraph>
            <BlogParagraph>
                On QWERTY I mapped jk to escape in Vim, but this doesn&apos;t
                work with Colemak DH, and I couldn&apos;t find a similar bigram
                that made sense. I have swapped the escape key with the caps
                lock key as I never use it, so I can now just use the escape key
                with my pinky instead of the remap.
            </BlogParagraph>
            <BlogParagraph>
                On the thumb cluster I have left for all the &quot;spacing&quot;
                type keys. So tab, enter, backspace and space. The layer keys
                are on the remaining harder to reach thumb keys.
            </BlogParagraph>
            <BlogParagraph>
                I quite like the inner keys on the Lily58 so I moved the Minus
                and Equals keys to them which is easier to remember than their
                usual top right positions.
            </BlogParagraph>
            <BlogParagraph>
                The Grave key has always been a horrible stretch and it is quite
                common in JavaScript to use it for template literals, so I have
                moved it below the Quote key.
            </BlogParagraph>
            <BlogParagraph>
                The brackets I have then placed either side on the top alpha row
                as it isn&apos;t too bad a stretch and again it is nice
                symmetry.
            </BlogParagraph>
            <BlogParagraph>
                From here whatever is left moves to the pinky corners.
            </BlogParagraph>
            <BlogHeading>Home Row Mods</BlogHeading>
            <BlogParagraph>
                Perhaps the biggest surprise to me was how I instantly fell in
                love with the home row mods. Some painful stretches are now
                gone, namely the OSX screen capture shortcut is now achievable
                from the home row.
            </BlogParagraph>
            <BlogHeading>Layers</BlogHeading>
            <BlogParagraph>
                I have so far only set up two different layers. The first is the
                navigation layer which adds arrow keys in the QWERTY Vim
                positions. I have also added the Page Up and Page Down keys to
                the top row and the Home and End in the same structure as a
                regular keyboard. I have started on a function layer which is a
                work in progress, and contains only music navigation for now.
            </BlogParagraph>
            <Lily58 />
        </>
    );
}
