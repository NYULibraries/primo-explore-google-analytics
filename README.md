# primo-explore-google-analytics

[![CircleCI](https://circleci.com/gh/NYULibraries/primo-explore-google-analytics.svg?style=svg)](https://circleci.com/gh/NYULibraries/primo-explore-google-analytics)
[![npm version](https://img.shields.io/npm/v/primo-explore-google-analytics.svg)](https://www.npmjs.com/package/primo-explore-google-analytics)
[![Coverage Status](https://coveralls.io/repos/github/NYULibraries/primo-explore-google-analytics/badge.svg?branch=master)](https://coveralls.io/github/NYULibraries/primo-explore-google-analytics?branch=master)

Google Analytics for Primo NUI packages

## Description

Because the root index.html is not directly accessible from custom views, this dependency can inject custom script tags into the the DOM document `<head>`.

## Installation

1. Assuming you've installed and are using [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv).

2. Navigate to your template/central package root directory. For example:
    ```
    cd primo-explore/custom/MY_VIEW_ID
    ```
3. If you do not already have a package.json file in this directory, create one:
    ```
    npm init -y
    ```
4. Install this package:
    ```
    npm install primo-explore-google-analytics --save-dev
    ```

## Usage


Once installed, first add `googleAnalytics` as a dependency:

```js
require('primo-explore-google-analytics');
// or, in a ESModules compatible environment:
// import 'primo-explore-google-analytics';

let app = angular.module('viewCustom', [
  'googleAnalytics'
])
```

Then, run the injection through a run block in your AnglularJS Application. This injection pattern follows "run block style" conventions, allowing for a finer control over the run order of your dependencies and better testing. See https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y171

```js
  app.run(runBlock);

  runBlock.$inject = ['gaInjectionService'];
  function runBlock(gaInjectionService) {
    // other potential run operations...
    gaInjectionService.injectGACode();
  }
```

This will add the necessary script tags to the bottom of the `head` of your web document, loading the necessary Google Analytics functionality.

### Config

You'll need to configure the module by passing it an object as an angular `constant` named `googleAnalyticsConfig`.

Optionally, you can also use an array of configurations if you need to add multiple tag managers to your page.

#### Required
| name | type | usage |
|------|-------------|--------|
| `trackingId` | `string` | Adds your GATM tracking id to default scripts ||

#### Configuration defaults

```html
<head>
  <!-- ... -->
  <script async src="https://www.googletagmanager.com/gtag/js?id={trackingId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '{trackingId}');
  </script>
</head>
```

#### Optional
| name | type | usage |
|------|-------------|--------|
| `externalScriptURL` | `string` |  If you are using an alternative URL, specify the source of the external script that is loaded. Use `null` if you don't want an external script to be loaded (especially for legacy Google Analytics using an `inlineScript`) |
| `inlineScript` | `string` | Specify the inline script tag to be inserted below the external script tag. |
| `target` | `string` | (default: `'head'`) What element on the document you would like to append the injected script to. E.g. `body`. Uses `document.querySelector` to find the first instance of the element. ||

#### Customization Example

```js
app.constant('googleAnalyticsConfig', {
  trackingId: 'AB-123456789',
  // use null to specify an external script shouldn't be loaded
  externalScriptURL: null,
  // copy from script snippet from Google if you're running legacy Google Analytics
  inlineScript: `
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'AB-123456789']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  `,
  target: 'body',
})
```
output:
```html
<head>
  <!-- ... -->
  <!-- or, if included: <script async src="{externalScriptURL}"></script> -->
  <script>
  var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'AB-123456789']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  </script>
</head>
```
