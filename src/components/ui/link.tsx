import NextLink from "next/link";
import clsx from "clsx";

type LinkComponentProps = React.ComponentProps<typeof NextLink> & {
    external?: boolean;
};

function Link({ external, className, ...props }: LinkComponentProps) {
    return (
        <NextLink
            {...props}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={clsx(
                "transition-all hover:text-muted-foreground [&_span]:font-mono",
                className,
                {
                    "font-mono [word-spacing:-4px]":
                        typeof props.children === "string",
                },
            )}
        />
    );
}

export { Link };
