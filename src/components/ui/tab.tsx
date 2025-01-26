type TabProps = {
    title: string;
    children: React.ReactNode;
};

function Tab({ title, children }: TabProps) {
    return (
        <section className="flex flex-1 flex-col gap-6">
            <h1 className="text-2xl font-semibold text-primary">{title}</h1>
            <div className="flex flex-col gap-4">{children}</div>
        </section>
    );
}

export default Tab;
