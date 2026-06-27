import NextLink, { LinkProps } from "next/link";
import clsx from "clsx";

type LinkComponentProps<RouteType> = Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof LinkProps<RouteType>
> &
    LinkProps<RouteType> & {
        external?: boolean;
    };

function Link<RouteType>({
    external,
    className,
    ...props
}: LinkComponentProps<RouteType>) {
    return (
        <NextLink
            {...props}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={clsx(
                "hover:text-muted-foreground transition-all [&_span]:font-mono",
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
