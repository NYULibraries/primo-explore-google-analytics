angular.module('googleAnalytics', [])
  .factory('gaInjectionService', ['googleAnalyticsConfig', function(googleAnalyticsConfig) {
    const defaultCode = `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${googleAnalyticsConfig.trackingId}');`;
    const _inlineCode = googleAnalyticsConfig.inlineScript || defaultCode;

    const defaultURL = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsConfig.trackingId}`;
    let _externalSource;

    if (googleAnalyticsConfig.externalScriptURL === undefined) {
      _externalSource = defaultURL;
    } else {
      _externalSource = googleAnalyticsConfig.externalScriptURL;
    }

    return {
      $getExternalSource: _externalSource,
      $getInlineCode: _inlineCode,
      injectGACode() {
        if (_externalSource !== null) {
          const externalScriptTag = document.createElement('script');
          externalScriptTag.src = _externalSource;
          document.head.appendChild(externalScriptTag);
        }

        const inlineScriptTag = document.createElement('script');
        inlineScriptTag.type = 'text/javascript';

        // Methods of adding inner text sometimes doesn't work across browsers.
        try {
          inlineScriptTag.appendChild(document.createTextNode(_inlineCode));
        } catch (e) {
          inlineScriptTag.text = _inlineCode;
        }

        document.head.appendChild(inlineScriptTag);
      }
    };
  }]);
