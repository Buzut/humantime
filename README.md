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
import humanTime from 'humantime';

// you can pass the function either a plain string
const formattedDateStr = humanTime('2017-11-18T10:11:47.232Z');

// or a Date object
const formattedDateObj = humanTime(new Date());

// options allow you to define the module's behaviour
const formattedDateObjFrenchCanadian = humanTime(new Date(), {
  locale: 'fr-FR',
  disableRelative: true, // "12 Décembre" instead of "5 min"
  month: 'numeric' // "12/12" instead of "12 Décembre"
});
```

### The options object

- `locale` defaults to the browser default with latin numbers, but you can pass any ISO language code or any [`Locales`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) supported by the [`Intl` api](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- `year`, `day` and `month` (and `hour`, `minute`, `second` for time) define the display format as per the [DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) options
- `forceYear` (bool) to force display the year even when it's the current year
- `forceTime` (bool) to show time precision when in absolute mode (18 October 2022 at 2:40 am)
- `disableRelative` (bool) to always display absolute dates

Note that in the `forceTime` case, only hour and minute is displayed by default. If you need seconds as well, you need to pass it explicitly:

```js
humanTime(timeStamp, { forceTime: true, second: 'numeric' });
```

That's all there is to know!

## Under the hood

The module takes advantage of capabilities natively offered by [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). It allows for an extremely lightweight lib (less than 1kB gzipped) as there is no need to embed explicit translation and formatting rules.

`Intl` support [is quite broad](https://caniuse.com/#feat=internationalization) so there's no need to polyfill if you're targetting reasonably modern browsers.

## Go to bed smarter than you woke up

You might not know it, but the [ISO codes](https://en.wikipedia.org/wiki/ISO_3166-2) we use to specify locales (country and optionally region) derive from another standard: the [UN M49](https://en.wikipedia.org/wiki/UN_M49). Under the UN Standard Country or Area Codes, the world is divided into Area and Subregions, each having its own 3-digit code.

As the [unicode library](https://en.wikipedia.org/wiki/International_Components_for_Unicode) has a complete support for both ISO and UN notations, you can refer to locales as any of them `fr-250` being equal to `fr-FR`.

Now what's cool is that since around 2017, [world zones have been added](https://www.ctrl.blog/entry/en-001.html): Europe and World. This means that you can refer to a generic english when it makes sense!

`en-001` is english world, or international english if you will. This would format a datetime like this: "18 October 2022 at 2:40 am" instead of the North American "October 18, 2022 at 2:40 AM".

The European english, `en-150` would slightly differ in the time handling, going for the 24h format: "18 October 2022 at 02:40".

As for currencies (even if unrelated with `humanTime`) international english will be more precise with the currency at hand: "US$99.90" for both `en-001` and `en-150` whereas `en` (or `en-US` obviously) would display "$99.90". The latter can be confusing for an international audience that has no idea if we're talking USD, CAD, AUD or whatnot.

As it has full support in glibc, it's in all operating systems and browers: Chrome, Firefox, Safari, Opera, you name it! Worse case scenario, on very old systems that wouldn't support it, it would fallback to the broader 2-letter code: "en" in our case.

## Contributing

There's sure room for improvement, so feel free to hack around and submit PRs!
Just make sure to use Prettier for code formatting and you're all set 👍
