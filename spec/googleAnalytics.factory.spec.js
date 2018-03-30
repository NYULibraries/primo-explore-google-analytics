const googleAnalyticsConfig = __fixtures__["googleAnalyticsConfig"];
const googleAnalyticsConfigWithDefaults = __fixtures__["googleAnalyticsConfigWithDefaults"];

Object.freeze(googleAnalyticsConfig);
Object.freeze(googleAnalyticsConfigWithDefaults);

describe('googleAnalyticsService', () => {

  describe("with default config", () => {
    beforeEach(module('googleAnalytics', function($provide) {
      $provide.constant('googleAnalyticsConfig', googleAnalyticsConfigWithDefaults);
    }));

    let gaService;
    beforeEach(inject((_gaService_) => {
      gaService = _gaService_;
    }));

    it('should have getters for inlineCode and externalScriptURL', () => {
      expect(gaService.$getExternalSource).toBeDefined();
      expect(gaService.$getInlineCode).toBeDefined();
    });

    it('should have injectGACode defined on the service', () => {
      expect(gaService.injectGACode).toBeDefined();
    });

    describe('injectGACode', () => {

      let scripts;
      beforeEach(() => {
        const getScripts = () => document.head.querySelectorAll('script');
        Array.from(getScripts()).forEach(script => script.parentNode.removeChild(script));
        gaService.injectGACode();
        scripts = getScripts();
      });

      it('should add the default external script tag', () => {
        const src = scripts[0].src;
        expect(src).toEqual(`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsConfig.trackingId}`);
      });

      it('should add the default inline script tag', () => {
        const innerText = scripts[1].innerText.replace(/\s+/g,' ').trim();
        expect(innerText).toContain(`gtag('config', '${googleAnalyticsConfig.trackingId}')`);
      });
    });
  });

  describe("with defined script config", () => {
    beforeEach(module('googleAnalytics', function($provide) {
      $provide.constant('googleAnalyticsConfig', googleAnalyticsConfig);
    }));

    let gaService;
    beforeEach(inject((_gaService_) => {
      gaService = _gaService_;
    }));

    it('should have getters for inlineCode and externalScriptURL', () => {
      expect(gaService.$getExternalSource).toBeDefined();
      expect(gaService.$getInlineCode).toBeDefined();
    });

    it('should have injectGACode defined on the service', () => {
      expect(gaService.injectGACode).toBeDefined();
    });

    describe('injectGACode', () => {

      let scripts;
      beforeEach(() => {
        const getScripts = () => document.head.querySelectorAll('script');
        Array.from(getScripts()).forEach(script => script.parentNode.removeChild(script));
        gaService.injectGACode();
        scripts = getScripts();
      });

      it('should add the default external script tag', () => {
        const src = scripts[0].src;
        expect(src).toEqual(googleAnalyticsConfig.externalScriptURL);
      });

      it('should add the default inline script tag', () => {
        const innerText = scripts[1].innerText.replace(/\s+/g,' ').trim();
        expect(innerText).toEqual(googleAnalyticsConfig.inlineScript);
      });
    });
  });

});
