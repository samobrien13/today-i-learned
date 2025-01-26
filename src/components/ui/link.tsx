import { Link as NextViewLink } from "next-view-transitions";
import NextLink from "next/link";
import clsx from "clsx";

type LinkComponentProps = React.ComponentProps<typeof NextLink> & {
    external?: boolean;
};

function Link({ external, className, ...props }: LinkComponentProps) {
    return (
        <NextViewLink
            {...props}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={clsx(
                "transition-all hover:text-muted-foreground [&_span]:font-mono",
                className,
                {
                    "font-mono": typeof props.children === "string",
                },
            )}
        />
    );
}

export { Link };
