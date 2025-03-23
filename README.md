<img width="150" src="docs/Icon.png">

[![GitHub license](https://img.shields.io/github/license/totofish/XSS.svg)](https://github.com/totofish/XSS/blob/master/LICENSE)
[![NodeJS with Vite](https://github.com/totofish/XSS/actions/workflows/main.yml/badge.svg)](https://github.com/totofish/XSS/actions/workflows/main.yml)

## Introduction

This is a chrome extension tool that can inject custom `Script` into the current web page, such as loading Jquery into the page to facilitate DOM operations, or reading cookie information and any other JS Script you want to execute, for the purpose of testing or development debugging.

## Extension Install

Install it from the Chrome Web Store (https://chrome.google.com/webstore/detail/xss/bebjbdbgpmgdlfehkibnmgmbkcniaeij)

## Auto Execute

Version v1.1.0 adds the Auto Execute feature. After switching to the Auto Execute state, scripts will be executed directly at the beginning when the web page is refreshed, which is convenient for executing some tasks that need to be executed at the beginning, such as using [Polly.js](https://netflix.github.io/pollyjs/) to handle the behavior of the mock api. However, you must be careful that the script you write does not cause infinite page refreshes.

```js
// For example, this script will refresh the page after enabling Auto Execute
location.reload()
```

## Extension

<img width="469" src="docs/dark_theme_1.png">
<img width="800" src="docs/dark_theme_2.png">

## Theme

Right click on the plugin icon and select `Options` to cancel `Dark Theme` and use `Light Theme` instead

<img width="469" src="docs/light_theme_1.png">
<img width="800" src="docs/light_theme_2.png">

## Export and Import Scripts

Right-click the plugin icon and select `Export Scripts` to download all current scripts as `scripts.json`. You can also drag the `scripts.json` file into the window interface opened by XSS or import scripts through the `Options` function to import the Scripts record.

## Options

<img width="469" src="docs/options.png">

Tips

Extension uses closure when injecting script, so variables will not pollute the window. If you need to obtain global level parameters, you can explicitly use window or this.

```js
console.log(this === window); // true
```
