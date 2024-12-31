# humanTime

Convert timestamps to natural language: "2024-11-15 07:13:27" becomes "Yesterday" or "Last year" depending in when you are NOW.

humanTime is a no dependency module for the Browser and the server (Node.js, Bun & Deno) aimed at formatting time and date in a human readable format. Time is expressed as:

- minutes if `date` < 1 hour (3 min, 10 min…),
- hours if `date` < 24 hours (1 h, 6 h…),
- a localized string if more than 24 hours ago (12 décembre, December 12…)
- a localized string mentioning the year if not the same year as we are (12 décembre 2014, December 12, 2014…)

Behaviour can be changed with the options object. Regarding i18n, the module defaults to the environment's locale. Either the browser's default language for browsers, or the server locale for server side runtime.

## Installation & usage

```
npm install humantime
```

```js
import humanTime from "humantime";

// you can pass the function either a plain string
const formattedDateStr = humanTime("2017-11-18T10:11:47.232Z");

// or a Date object
const formattedDateObj = humanTime(new Date());

// options allow you to define the module's behaviour
const formattedDateObjFrenchCanadian = humanTime(new Date(), {
    locale: "fr-FR",
    disableRelative: true, // "12 Décembre" instead of "5 min"
    month: "numeric", // "12/12" instead of "12 Décembre"
});
```

### The options object

-   `locale` defaults to the browser default with latin numbers, but you can pass any ISO language code or any [`Locales`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) supported by the [`Intl` api](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
-   `year`, `day` and `month` define the display format as per the [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) options
-   `forceYear` (bool) to force display the year even when it's the current year
-   `disableRelative` (bool) to always display absolute dates

That's all there is to know!

## Under the hood

The module takes advantage of capabilities natively offered by [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). It allows for an extremely lightweight lib (less than 1kB gzipped) as there is no need to embed explicit translation and formatting rules.

`Intl` support [is quite broad](https://caniuse.com/#feat=internationalization) so there's no need to polyfill if you're targetting reasonably modern browsers.

## Contributing

There's sure room for improvement, so feel free to hack around and submit PRs!
Just make sure to use Prettier for code formatting and you're all set 👍
