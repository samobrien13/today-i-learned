import {
    BlogHeading,
    BlogParagraph,
    BlogSubHeading,
} from "@/components/ui/blog";
import { BlogData } from "@/data/blog";
import { Link } from "@/components/ui/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Colours } from "@/components/colours";
import { ColourConverter } from "@/components/tools/colour-converter";

export const DESIGN_SYSTEM: BlogData = {
    title: "Design System",
    description: "My design system",
    date: "2025-01-22",
    slug: "design-system",
    tags: ["design"],
    component: <DesignSystem />,
};

function DesignSystem() {
    return (
        <div className="theme-custom">
            <BlogParagraph>
                I highly recommend{" "}
                <Link href="https://www.refactoringui.com/" external>
                    Refactoring UI
                </Link>
                , written by the creators of{" "}
                <Link href="https://tailwindcss.com" external>
                    Tailwind CSS
                </Link>
                . It&apos;s the only design resource you need for learning how
                to design half decent UI without being a designer.
            </BlogParagraph>
            <BlogParagraph>
                Tailwind is the easiest styling system I&apos;ve ever used.
                It&apos;s a utility first CSS framework that allows you to build
                complex designs with simple utility classes. No need for messy
                cascading stylesheets with classes that you can never remove.
                Learn once and never use another CSS framework again.
            </BlogParagraph>
            <BlogParagraph>
                I use{" "}
                <Link href="https://ui.shadcn.com/" external>
                    shadcn
                </Link>{" "}
                as my component library. There are only so many times I can be
                bothered to build the same button for each new project. Shadcn
                is a collection of bare components that you can install into
                your project and own the code for. Then style however you like.
            </BlogParagraph>
            <BlogHeading>Spacing</BlogHeading>
            <BlogParagraph>
                The book recommends starting with too much space and then
                reducing it as you go. This is a good way to ensure that your
                designs are not too cluttered.
            </BlogParagraph>
            <BlogHeading>Colours</BlogHeading>
            <BlogParagraph>
                HSL (Hue, Saturation, Lightness) is favoured as a more intuitive
                representation of colour than RGB or Hex.
            </BlogParagraph>
            <BlogParagraph>
                Hue is a colour&apos;s position on the colour wheel, saturation
                is the intensity of the colour, and lightness is how bright the
                colour is relative to black. Use my colour converter tool to see
                how this works.
            </BlogParagraph>
            <div className="pb-4">
                <ColourConverter />
            </div>
            <BlogSubHeading>Default</BlogSubHeading>
            <BlogParagraph>
                Default background is used for the background of the page.
                Default foreground is used for text.
            </BlogParagraph>
            <BlogSubHeading>Card</BlogSubHeading>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Cards use a different shade for the background and the
                        foreground. They also make use of the border colour.
                    </CardDescription>
                </CardContent>
            </Card>
            <div className="pb-20">
                <HoverCard>
                    <HoverCardTrigger>
                        <BlogHeading>Popover</BlogHeading>
                        <BlogParagraph>
                            Popovers are used for displaying information in
                            elements like tooltips or dropdowns.
                        </BlogParagraph>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <BlogParagraph>Like this hover card</BlogParagraph>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <BlogSubHeading>Primary</BlogSubHeading>
            <BlogParagraph>
                Primary colours are used for primary actions or elements.
            </BlogParagraph>
            <Button className="mb-6">Primary Button</Button>
            <BlogSubHeading>Secondary</BlogSubHeading>
            <BlogParagraph>
                Secondary colours are used for secondary actions or elements.
            </BlogParagraph>
            <Button className="mb-6" variant="secondary">
                Secondary Button
            </Button>
            <BlogSubHeading>Muted</BlogSubHeading>
            <BlogParagraph>
                Muted colours are used for elements that are not the primary
                focus, and secondary text.
            </BlogParagraph>
            <BlogSubHeading>Accent</BlogSubHeading>
            <BlogParagraph>
                Accent colours are used for highlighting elements and mild hover
                effects.
            </BlogParagraph>
            <BlogSubHeading>Destructive</BlogSubHeading>
            <BlogParagraph>
                Destructive colours are used for destructive actions.
            </BlogParagraph>
            <Button className="mb-6" variant="destructive">
                Destructive Button
            </Button>
            <BlogSubHeading>Border</BlogSubHeading>
            <BlogParagraph>Default border colour</BlogParagraph>
            <BlogSubHeading>Input, Ring</BlogSubHeading>
            <BlogParagraph>
                Input is used for the border colour of input elements. Ring is
                used for the border colour of focused input
            </BlogParagraph>
            <Input className="mb-6" placeholder="Input" />
            <BlogSubHeading>Custom</BlogSubHeading>
            <BlogParagraph>
                Finally we have a set of chart colours that are used whenever a
                splash of colour is needed, mainly for syntax highlighting.
            </BlogParagraph>
            <Colours />
        </div>
    );
}

export default DesignSystem;
