export default function humanDate(date) {
    let dateObj;
    if (typeof date === 'string') dateObj = new Date(date);
    else dateObj = date;

    const options = { month: 'long', day: 'numeric' };

    const dateYear = dateObj.toLocaleString('latn', { year: 'numeric' });
    const dateMonth = dateObj.toLocaleString('latn', { month: 'numeric' });
    const dateDay = dateObj.toLocaleString('latn', { day: 'numeric' });
    const dateHour = dateObj.getHours();
    const dateMinute = dateObj.getMinutes();

    const now = new Date();
    const nowYear = now.toLocaleString('latn', { year: 'numeric' });
    const nowMonth = now.toLocaleString('latn', { month: 'numeric' });
    const nowDay = now.toLocaleString('latn', { day: 'numeric' });
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();

    // set year only if not the same year as now
    if (dateYear !== nowYear) options.year = 'numeric';

    // if today, display relative time
    if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay) {
        const diffHour = nowHour - dateHour;
        const diffMinute = (nowMinute + 60) - dateMinute;

        if (diffHour === 0 && diffMinute > 30 && diffMinute <= 90) return '1 h';
        else if (diffHour === 0) return `${diffMinute} min`;
        return `${diffHour} h`;
    }

    return dateObj.toLocaleString('latn', options);
}
