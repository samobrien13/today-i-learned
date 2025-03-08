export function formatDate(date: Date | string): string {
    if (typeof date === "string") {
        date = new Date(date + 'T00:00:00.000Z');
    }

    const diff = (new Date().getTime() - date.getTime()) / 1000;
    const rtf = new Intl.RelativeTimeFormat("en-GB", {
        numeric: "auto",
        style: "long",
    });

    return rtf.format(0 - diff, "second");
}
