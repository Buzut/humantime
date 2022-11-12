# humanTime

humanTime is a super lightweight module aimed at formating time and date in a human readable format, à la Tweeter. Time is expressed:
- in minutes if `date` < 1 hour (3 min, 10 min…),
- in hours if `date` < 24 hours (1 h, 6 h…),
- with a localized string if more than 24 hours ago (12 décembre, December 12…)
- with a localized string mentionning the year if not the same year as we are (12 décembre 2014, December 12, 2014…)

This default behaviour can be changed by using the options object.

## Installation & usage

```
npm install humantime
```

```js
import humanTime from 'humantime';

// you can pass the function either a plain string
const formattedDateStr = humanTime('2017-11-18T10:11:47.232Z');

// or a Date object
const formattedDateObj = humanTime(new Date());

// options allow you to define the module's behaviour
const formattedDateObjFrenchCanadian = humanTime(new Date(), {
    locale: 'fr-FR',
    disableRelative: true
});
```

### The options object

* `locale` defaults to the browser default with latin numbers, but you can pass any ISO language code or any [`Locales`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) supported by the [`Intl` api](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
* `year`, `day` and `month` define the display format as per the [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) options
* `forceYear` (bool) to force display the year even when it's the current year
* `disableRelative` (bool) to always display absolute dates

That's all there is to know!

## Under the hood

The module takes advantage of modern browsers' [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) capabilities. It allows for an extremely lightweight lib (less than 1kB gzipped) as there is no need to embbed explicit translation and formating rules.

`Intl` support [is quite broad](https://caniuse.com/#feat=internationalization) so there's no need to polyfill if you're targetting reasonably modern browsers.

## Contributing

There's sure room for improvement, so feel free to hack around and submit PRs!
Please just follow the style of the existing code, which is [Airbnb's style](http://airbnb.io/javascript/) with [minor modifications](.eslintrc).

To maintain things clear and visual, please follow the [git commit template](https://github.com/Buzut/git-emojis-hook).
