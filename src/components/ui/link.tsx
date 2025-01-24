import { Link as NextViewLink } from "next-view-transitions";
import NextLink from "next/link";
import clsx from "clsx";

type LinkComponentProps = React.ComponentProps<typeof NextLink>;

function Link(props: LinkComponentProps) {
    return (
        <NextViewLink
            {...props}
            className={clsx(
                "transition-all hover:text-muted-foreground [&_span]:font-mono",
                props.className,
                {
                    "font-mono": typeof props.children === "string",
                },
            )}
        />
    );
}

export { Link };
