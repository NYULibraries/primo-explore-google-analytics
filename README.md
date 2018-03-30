# primo-explore-google-analytics
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
    npm install primo-explore-primo-explore-google-analytics --save-dev
    ```

## Usage

Once installed, inject `googleAnalytics` as a dependency after `angulartics` and `angulartics.google.tagmanager`:

```js
let app = angular.module('viewCustom', [
  'angulartics',
  'angulartics.google.tagmanager',
  'googleAnalytics'
])
```

Then, run the injection through a run block in your AnglularJS Application:

```js
  // Folllows run block style conventions. See https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y171

  app
    .run(runBlock);

    runBlock.$inject = ['gaInjectionService'];

    function runBlock(gaInjectionService) {
      // other potential run operations...
      gaInjectionService.injectGACode();
    }
```

**Note:** If you're using the --browserify build option, you will need to first import the module with:

```js
import 'primo-explore-google-analytics';
```

This will add the necessary script tags to the bottom of the `head` of your web document, loading the necessary Google Analytics functionality.

### Config

You'll need to configure the module by passing it an object as an angular `constant`.

| name | type | usage |
|------|-------------|--------|
| `trackingId` | string | Adds your google analytics  |
| `externalScriptURL` *optional* | string |  Specify the source of the external script that is loaded (e.g. `"https://www.googletagmanager.com/gtag/js?id=AB-1234567"`). Use `null` if you don't want an external script to be loaded (for legacy Google Analytics) |
| `inlineScript` *optional* | string | Specify the inline script tag to be inserted below the external script tag. ||

#### Configuration defaults

If `externalScriptURL` or `inlineScript` are not specified, the script insertions that are loaded into the DOM are:

```html
<head>
  <!-- ... -->
  <!-- googleAnalyticsConfig.externaLScriptUrl -->
  <script async src="https://www.googletagmanager.com/gtag/js?id={TRACKING_ID}"></script>

  <!-- googleAnalyticsConfig.inlineScript -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${TRACKING_ID}');
  </script>
</head>
```

#### Example

```js
app.constant('googleAnalyticsConfig', {
  trackingId: "AB-123456789",
  // use null to specify an external script shouldn't be loaded
  externalScriptURL: null,
  // copy from script snippet from Google if you're running legacy Google Analytics
  inlineScript: `var _gaq = _gaq || [];
                _gaq.push(['_setAccount', 'UA-XXXXX-X']);
                _gaq.push(['_trackPageview']);

                (function() {
                  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                })();`
})
```
