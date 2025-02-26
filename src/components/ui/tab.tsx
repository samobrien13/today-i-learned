type TabProps = {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
};

function Tab({ title, subtitle, children }: TabProps) {
    return (
        <section className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1
                    className="text-2xl font-semibold text-primary"
                    style={{
                        viewTransitionName: `tab-${title.toLowerCase()}`,
                    }}
                >
                    {title}
                </h1>
                {subtitle ? (
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                ) : null}
            </div>
            <div className="flex flex-col gap-4">{children}</div>
        </section>
    );
}

export default Tab;
