# humanTime

Convert timestamps to natural language: "2025-04-08 07:13:27" becomes "yesterday" or "2 hours ago" based on the current time (e.g., April 9, 2025).

`humanTime` is a zero-dependency module for browsers and servers (Node.js, Bun, Deno) that formats dates and times into human-readable strings. It expresses time as:

- Seconds if under 1 minute (e.g., "30 seconds ago"),
- Minutes if under 1 hour (e.g., "45 minutes ago"),
- Hours if under 24 hours (e.g., "2 hours ago"),
- Days if within the same year (e.g., "3 days ago" or "tomorrow"),
- A localized absolute date if in a different year (e.g., "April 9, 2024" or "9 avril 2024").

Customize the output with an options object. For internationalization (i18n), it defaults to the environment’s locale—browser language in the client or system locale on the server.

## Installation & Usage

```bash
npm install humantime
```

```javascript
import humanTime from 'humantime';

// Use a string
const formattedDateStr = humanTime('2025-04-09T10:11:47.232Z');

// Or a Date object
const formattedDateObj = humanTime(new Date());

// Customize with options
const formattedFrench = humanTime(new Date(), {
  locale: 'fr-FR',
  disableRelative: true, // "9 avril 2025" instead of "5 minutes ago"
  month: 'numeric'      // "09/04/2025" instead of "9 avril 2025"
});
```

### The Options Object

- **`locale`**: Defaults to the environment’s locale with Latin numbers (`default-u-nu-latn`). Accepts any ISO language code or [`Locales`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) from the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
- **`year`, `month`, `day`**: Set display format per [`DateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) (e.g., `'numeric'`, `'long'`).
- **`hour`, `minute`, `second`**: Add time details (e.g., `'numeric'` for "14:30").
- **`forceYear` (bool)**: Include the year even if it’s the current year (e.g., "April 9, 2025" vs. "April 9").
- **`forceTime` (bool)**: Show time in absolute mode (e.g., "April 9, 2025, 2:40 PM").
- **`disableRelative` (bool)**: Use absolute dates only (e.g., "April 9, 2025" vs. "2 days ago").

For `forceTime`, hours and minutes appear by default. To include seconds, specify it:

```javascript
humanTime(timestamp, { forceTime: true, second: 'numeric' });
```

That’s all you need!

## Under the Hood

`humanTime` uses the native [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl), including `Intl.RelativeTimeFormat`, for natural, locale-aware formatting. This keeps it lightweight (<1kB gzipped) without needing built-in translation or formatting rules.

[`Intl` support](https://caniuse.com/#feat=internationalization) is robust, so no polyfills are required for modern browsers (Chrome, Firefox, Safari, Edge).

## Go to bed smarter than you woke up

You might not know it, but the [ISO codes](https://en.wikipedia.org/wiki/ISO_3166-2) we use to specify locales (country and optionally region) derive from another standard: the [UN M49](https://en.wikipedia.org/wiki/UN_M49). Under the UN Standard Country or Area Codes, the world is divided into Area and Subregions, each having its own 3-digit code.

As the [unicode library](https://en.wikipedia.org/wiki/International_Components_for_Unicode) has a complete support for both ISO and UN notations, you can refer to locales as any of them `fr-250` being equal to `fr-FR`.

Now what's cool is that since around 2017, [world zones have been added](https://www.ctrl.blog/entry/en-001.html): Europe and World. This means that you can refer to a generic english when it makes sense!

`en-001` is english world, or international english if you will. This would format a datetime like this: "18 October 2022 at 2:40 am" instead of the North American "October 18, 2022 at 2:40 AM".

The European english, `en-150` would slightly differ in the time handling, going for the 24h format: "18 October 2022 at 02:40".

As for currencies (even if unrelated with `humanTime`) international english will be more precise with the currency at hand: "US$99.90" for both `en-001` and `en-150` whereas `en` (or `en-US` obviously) would display "$99.90". The latter can be confusing for an international audience that has no idea if we're talking USD, CAD, AUD or whatnot.

As it has full support in glibc, it's in all operating systems and browers: Chrome, Firefox, Safari, Opera, you name it! Worse case scenario, on very old systems that wouldn't support it, it would fallback to the broader 2-letter code: "en" in our case.

## Contributing

Room for improvement? Hack away and submit PRs! Use ESLint for linting & formatting, and you’re set 👍.
