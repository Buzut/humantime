export default function (date, opts) {
  let dateObj;
  if (typeof date === 'string') dateObj = new Date(date);
  else dateObj = date;

  const locale = opts?.locale ? opts.locale : 'default-u-nu-latn';

  const options = {
    year: opts?.year ? opts.year : 'numeric',
    month: opts?.month ? opts.month : 'long',
    day: opts?.day ? opts.day : 'numeric'
  };

  if (opts.forceTime) {
    options.hour = 'numeric';
    options.minute = 'numeric';
  }

  if (opts.hour) options.hour = opts.hour;
  if (opts.minute) options.minute = opts.minute;
  if (opts.second) options.second = opts.hour;

  const dateYear = dateObj.toLocaleString(locale, { year: 'numeric' });
  const dateMonth = dateObj.toLocaleString(locale, { month: 'numeric' });
  const dateDay = dateObj.toLocaleString(locale, { day: 'numeric' });
  const dateHour = dateObj.getHours();
  const dateMinute = dateObj.getMinutes();

  const now = new Date();
  const nowYear = now.toLocaleString(locale, { year: 'numeric' });
  const nowMonth = now.toLocaleString(locale, { month: 'numeric' });
  const nowDay = now.toLocaleString(locale, { day: 'numeric' });
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();

  // set year only if not the same year as now or if set to force
  if (dateYear !== nowYear || opts.forceYear) options.year = 'numeric';

  if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay && !opts.disableRelative) {
    // if today, display relative time
    const diffHour = nowHour - dateHour;
    const diffMinute = Math.abs(nowMinute - dateMinute);

    if (diffHour === 0 && diffMinute > 30) return '1 h';
    else if (diffHour === 0) return `${diffMinute} min`;
    else if (diffMinute >= 30) return `${diffHour + 1} h`;
    return `${diffHour} h`;
  }

  return dateObj.toLocaleString(locale, options);
}
