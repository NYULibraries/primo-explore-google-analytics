import "angulartics";
import "angulartics-google-tag-manager";

function buildConfig({ externalScriptURL, inlineScript, trackingId, target }) {
  const defaultCode = `window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${trackingId}');`;
  const defaultURL = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;

  return {
    externalSource: externalScriptURL === undefined ? defaultURL : externalScriptURL,
    inlineCode: inlineScript || defaultCode,
    target: target || 'head',
  };
}

angular
  .module('googleAnalytics', ["angulartics", "angulartics.google.tagmanager"])
  .factory('gaInjectionService', ['googleAnalyticsConfig', function(googleAnalyticsConfig) {

    const configs = Array.isArray(googleAnalyticsConfig) ?
      googleAnalyticsConfig.map(buildConfig)
      : [googleAnalyticsConfig].map(buildConfig);

    return ({
      injectGACode: () => {
        configs.forEach(({ externalSource, inlineCode, target }) => {
          if (externalSource !== null) {
            const externalScriptTag = document.createElement('script');
            externalScriptTag.src = externalSource;
            document.querySelector(target).appendChild(externalScriptTag);
          }

          const inlineScriptTag = document.createElement('script');
          inlineScriptTag.type = 'text/javascript';

          // Methods of adding inner text sometimes don't work across browsers.
          try {
            inlineScriptTag.appendChild(document.createTextNode(inlineCode));
          } catch (e) {
            inlineScriptTag.text = inlineCode;
          }

          document.querySelector(target).appendChild(inlineScriptTag);
        });
      },
    });
  }]);
