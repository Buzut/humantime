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
export default function (date, opts) {
  /**
   * @type {Date}
   */
  let dateObj;
  if (typeof date === 'string') dateObj = new Date(date);
  else dateObj = date;

  const locale = opts?.locale ? opts.locale : 'default-u-nu-latn';

  const options = {
    year: opts?.year ? opts.year : 'numeric',
    month: opts?.month ? opts.month : 'long',
    day: opts?.day ? opts.day : 'numeric'
  };

  if (opts?.forceTime) {
    options.hour = 'numeric';
    options.minute = 'numeric';
  }

  if (opts?.hour) options.hour = opts.hour;
  if (opts?.minute) options.minute = opts.minute;
  if (opts?.second) options.second = opts.second;

  const dateYear = dateObj.toLocaleString(locale, { year: 'numeric' });
  const dateMonth = dateObj.toLocaleString(locale, { month: 'numeric' });
  const dateDay = dateObj.toLocaleString(locale, { day: 'numeric' });

  /**
   * @type {Date}
   */
  const now = new Date();
  const nowYear = now.toLocaleString(locale, { year: 'numeric' });
  const nowMonth = now.toLocaleString(locale, { month: 'numeric' });
  const nowDay = now.toLocaleString(locale, { day: 'numeric' });

  // Set year only if not the same year as now or if forced
  if (dateYear !== nowYear || opts?.forceYear) options.year = 'numeric';

  if (dateYear === nowYear && !opts?.disableRelative) {
    // Calculate difference in milliseconds

    /**
     * @type {number}
     */
    const diffMs = dateObj.getTime() - now.getTime();
    const diffSeconds = Math.round(diffMs / 1000);
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (dateMonth === nowMonth && dateDay === nowDay) {
      if (Math.abs(diffSeconds) < 60) {
        return rtf.format(diffSeconds, 'second'); // e.g., "5 seconds ago"
      }

      else if (Math.abs(diffSeconds) < 3600) {
        const minutes = Math.round(diffSeconds / 60);
        return rtf.format(minutes, 'minute'); // e.g., "30 minutes ago"
      }

      else {
        const hours = Math.round(diffSeconds / 3600);
        return rtf.format(hours, 'hour'); // e.g., "2 hours ago"
      }
    }

    // Different day, same year
    else {
      const days = Math.round(diffSeconds / (3600 * 24));
      return rtf.format(days, 'day'); // e.g., "2 days ago" or "tomorrow"
    }
  }

  return dateObj.toLocaleString(locale, options);
}
