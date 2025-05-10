import {
    BlogHeading,
    BlogImage,
    BlogListItem,
    BlogParagraph,
    BlogUnorderedList,
} from "@/components/ui/blog";
import { Link } from "@/components/ui/link";
import { BlogData } from "@/data/blog";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

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
                I eventually settled on{" "}
                <Link external href="https://typeractive.xyz">
                    Typeractive
                </Link>
                , as it seemed popular and had free shipping to Australia. They
                offered the partially assembled boards I was looking for, and
                have a reassuring interface showing (almost) everything you need
                to buy.
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
                I used a combination of{" "}
                <Link external href="https://www.keybr.com">
                    Keybr
                </Link>
                ,{" "}
                <Link external href="https://monkeytype.com">
                    MonkeyType
                </Link>{" "}
                and{" "}
                <Link external href="https://ranelpadon.github.io/ngram-type">
                    Ngram
                </Link>{" "}
                to learn. I would recommend about a week to get up to speed to
                at least be functional in a work environment. Once you get past
                about 30 words per minute the cognitive burden of thinking about
                where each key is starts to go away. The average person types at
                about 40 words per minute, so at this point you are already
                faster than Brian from marketing.
            </BlogParagraph>
            <BlogHeading>Home Row Mods</BlogHeading>
            <BlogParagraph>
                Perhaps the biggest surprise to me was how I instantly fell in
                love with home row mods. This is where you use your home keys as
                modifiers when held down. I chose to go with the order (out to
                in) of Control, Alt, Command and Shift and have found that to
                work well on OSX. Some painful stretches are now gone, namely
                the OSX screen capture shortcut is now achievable from the home
                row. Some people report issues where you activate the mod layer
                when you don&apos;t mean to, but I haven&apos;t found this to be
                an issue yet and you can tweak the timings to your personal
                preference. You can also shift the modifiers to the bottom row
                so they are less likely to be pressed by accident.
            </BlogParagraph>
            <BlogParagraph>
                I had been slowly tinkering with the rest of the layout. I moved
                the symbols around based on some sort of intuitive sense, how
                often I use them and how easy it is for me to reach them. I
                don&apos;t mind using my pinky, but the top and bottom rows are
                hard for me so those 4 keys are reserved for the least used. But
                I could never find the right combination...
            </BlogParagraph>
            <BlogHeading>Miryoku Layout</BlogHeading>
            <BlogParagraph>
                The Miryoku layout is a layout designed for minimal keyboards.
                The default layout conveniently already uses Colemak DH and
                makes use of homerow mods and several layers to fit everything
                you need on a 40% keyboard.
            </BlogParagraph>
            <BlogParagraph>
                I tried to set up all sorts of different places for the symbols
                but I just cannot go past the Miryoku layout. Everything is so
                well thought out, I don&apos;t really know how I could improve
                it.
            </BlogParagraph>
            <BlogParagraph>
                One last thing I found useful was caps word functionality. This
                is very useful in programming where you often have to type
                constants and such in all caps. Caps word deactivates when you
                type a space, tab or punctuation. I bound this as a combo to
                when both of the shift keys are pressed.
            </BlogParagraph>
            <BlogHeading>Conclusion</BlogHeading>
            <BlogParagraph>
                Unfortunately, this means the Lily58 now has too many keys for
                me, so I will need to buy something else. For now I have made
                myself the Lily36 by modifying{" "}
                <Link
                    external
                    href="https://www.printables.com/model/93298-lily58-case"
                >
                    this case
                </Link>{" "}
                and getting someone to 3D print it for me, and I am really happy
                with the result. Complete with some generic rubber feet to tent
                it slightly and some coloured keycaps arranged in a tetris
                theme.
            </BlogParagraph>

            <BlogImage src="/images/rants/lily36.jpg" alt="Lily36" />
            <BlogParagraph>
                Once I can type a bit faster I will probably try out the 3x5
                Corne from Typeractive, which will require switching to choc
                switches. These{" "}
                <Link
                    external
                    href="https://keebd.com/products/ldsa-low-profile-blank-keycaps"
                >
                    LDSA keycaps
                </Link>{" "}
                look like they could smooth that transition out a bit, as I have
                grown to favour the DSA profile compared to something like a
                Macbook keyboard.
            </BlogParagraph>
            <BlogParagraph>
                Overall I am really loving the ability to configure the keyboard
                to my liking and may never find the perfect layout or the
                perfect hardware to go with it. The thumb cluster is a no
                brainer for increasing efficiency and adding the home row mods
                leaves so much space for everything else. By reducing the amount
                of keys and moving to a more efficient layout all of the pain I
                had in my wrists or pinky fingers has completely disappered,
                which will definitely help me in the long run.
            </BlogParagraph>
        </>
    );
}
