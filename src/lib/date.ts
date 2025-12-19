export function formatRelativeDate(date: Date | string): string {
    if (typeof date === "string") {
        date = new Date(date);
    }

    const seconds = (new Date().getTime() - date.getTime()) / 1000;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    const rtf = new Intl.RelativeTimeFormat("en-GB", {
        numeric: "auto",
        style: "long",
    });

    if (years > 0) {
        return Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(date);
    }
    if (months > 0) {
        return Intl.DateTimeFormat("en-GB", {
            month: "short",
            day: "numeric",
        }).format(date);
    }
    if (days > 0) {
        return rtf.format(0 - days, "day");
    }

    return rtf.format(0 - hours, "hour");
}

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

export const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatDateDifference = (date1: Date, date2: Date) => {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
        return `${hours}h ${remainingMinutes}m`;
    }

    return `${remainingMinutes}m`;
};