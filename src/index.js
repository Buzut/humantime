export default function humanDate(date, locales = 'default-u-nu-latn') {
    let dateObj;
    if (typeof date === 'string') dateObj = new Date(date);
    else dateObj = date;

    const options = { month: 'long', day: 'numeric' };

    const dateYear = dateObj.toLocaleString(locales, { year: 'numeric' });
    const dateMonth = dateObj.toLocaleString(locales, { month: 'numeric' });
    const dateDay = dateObj.toLocaleString(locales, { day: 'numeric' });
    const dateHour = dateObj.getHours();
    const dateMinute = dateObj.getMinutes();

    const now = new Date();
    const nowYear = now.toLocaleString(locales, { year: 'numeric' });
    const nowMonth = now.toLocaleString(locales, { month: 'numeric' });
    const nowDay = now.toLocaleString(locales, { day: 'numeric' });
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();

    // set year only if not the same year as now
    if (dateYear !== nowYear) options.year = 'numeric';

    // if today, display relative time
    if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay) {
        const diffHour = nowHour - dateHour;
        const diffMinute = Math.abs(nowMinute - dateMinute);

        if (diffHour === 0 && diffMinute > 30) return '1 h';
        else if (diffHour === 0) return `${diffMinute} min`;
        else if (diffMinute >= 30) return `${diffHour + 1} h`;
        return `${diffHour} h`;
    }

    return dateObj.toLocaleString(locales, options);
}
