# humanTime

humanTime is a super lightweight module aimed at formating time and date in a human readable format, à la Tweeter:
- express time in minutes if `date` < 1 hour (3 min, 10 min…),
- express time in hour if `date` < 24 hour (1 h, 6 h…),
- express time with a localized string if more than 24 hour ago (12 décembre, December 12…)
- express time with a localized string mentionning the year if not the same year as we are (12 décembre 2014, December 12, 2014…)

## Under the hood

The module takes advantage of modern browsers' [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) capabilities. It allows for an extremely lightweight module (less than 1kB gzipped) as there is no need to embbed explicit translation and formating rules.

`Intl` support [is quite broad](https://caniuse.com/#feat=internationalization) so there's no need to polyfill if you're targetting reasonably modern browsers.

## Installation & usage

```
npm install humantime
```

```js
// require using commonJS
const humanTime = require('humantime');

// or in es6, using a module bundler like webpack
import humanTime from 'humantime';

// you can pass the function either a plain string
const formattedDateStr = humanTime('2017-11-18T10:11:47.232Z');

// or a Date object
const formattedDateObj = humanTime(new Date());
```

That's all there is to know!

## Contributing

There's sure room for improvement, so feel free to hack around and submit PRs!
Please just follow the style of the existing code, which is [Airbnb's style](http://airbnb.io/javascript/) with [minor modifications](.eslintrc).
