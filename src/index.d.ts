/**
 * Format a date string or Date object based on provided options.
 * @param {string | Date} date - The date to format.
 * @param {Object} [opts] - Optional formatting options.
 * @param {string} [opts.locale] - The locale to use for formatting.
 * @param {"numeric" | "2-digit"} [opts.year] - The format for the year.
 * @param {"long" | "short" | "narrow" | "numeric" | "2-digit"} [opts.month] - The format for the month.
 * @param {"numeric" | "2-digit"} [opts.day] - The format for the day.
 * @param {boolean} [opts.forceTime] - Whether to include time components.
 * @param {"numeric" | "2-digit"} [opts.hour] - The format for the hour.
 * @param {"numeric" | "2-digit"} [opts.minute] - The format for the minute.
 * @param {"numeric" | "2-digit"} [opts.second] - The format for the second.
 * @param {boolean} [opts.forceYear] - Whether to force the year to be shown.
 * @param {boolean} [opts.disableRelative] - Whether to disable relative time formatting.
 * @returns {string} The formatted date string.
 */
export default function _default(date: string | Date, opts?: {
    locale?: string;
    year?: "numeric" | "2-digit";
    month?: "long" | "short" | "narrow" | "numeric" | "2-digit";
    day?: "numeric" | "2-digit";
    forceTime?: boolean;
    hour?: "numeric" | "2-digit";
    minute?: "numeric" | "2-digit";
    second?: "numeric" | "2-digit";
    forceYear?: boolean;
    disableRelative?: boolean;
}): string;
