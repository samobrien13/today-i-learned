import NextLink from "next/link";
import clsx from "clsx";

type LinkComponentProps<RouteType> = React.ComponentProps<
    typeof NextLink<RouteType>
> & {
    external?: boolean;
};

function Link<RouteType>({
    external,
    className,
    ...props
}: LinkComponentProps<RouteType>) {
    return (
        <NextLink<RouteType>
            {...props}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={clsx("transition-all", className, {
                "text-muted-foreground hover:text-foreground":
                    typeof props.children === "string",
            })}
        />
    );
}

export { Link };
