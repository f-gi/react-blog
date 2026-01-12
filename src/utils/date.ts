export function formatDate(
    iso?: string,
    locale = "en-US",
    options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }
) {
    if (!iso) return "";

    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat(locale, options).format(date);
}
