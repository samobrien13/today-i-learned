export function formatDate(date: Date | string): string {
    if (typeof date === "string") {
        date = new Date(date);
    }

    return Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}
