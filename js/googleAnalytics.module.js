angular.module('googleAnalytics', [])
  .factory('gaService', ['googleAnalyticsConfig', function(googleAnalyticsConfig) {
    const defaultCode = `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${googleAnalyticsConfig.trackingId}');`;
    const _inlineCode = googleAnalyticsConfig.inlineScript || defaultCode;

    const defaultURL = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsConfig.trackingId}`;
    const _externalSource = googleAnalyticsConfig.externalScriptURL || defaultURL;

    return {
      $getExternalSource: _externalSource,
      $getInlineCode: _inlineCode,
      injectGACode() {
        const externalScriptTag = document.createElement('script');
        externalScriptTag.src = _externalSource;
        document.head.appendChild(externalScriptTag);

        const inlineScriptTag = document.createElement('script');
        inlineScriptTag.type = 'text/javascript';

        try {
          inlineScriptTag.appendChild(document.createTextNode(_inlineCode));
          document.head.appendChild(inlineScriptTag);
        } catch (e) {
          inlineScriptTag.text = _inlineCode;
          document.head.appendChild(inlineScriptTag);
        }
      }
    };
  }])
  .run(['gaService', function(gaService) {
    gaService.injectGACode();
  }]);
