import { unstable_ViewTransition as ViewTransition } from "react";

type TabProps = {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
};

function Tab({ title, subtitle, children }: TabProps) {
    return (
        <section className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
                <ViewTransition name={`tab-${title.toLowerCase()}`}>
                    <h1 className="text-2xl font-semibold text-primary">
                        {title}
                    </h1>
                </ViewTransition>
                {subtitle ? (
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                ) : null}
            </div>
            <div className="flex flex-col gap-4">{children}</div>
        </section>
    );
}

export default Tab;
