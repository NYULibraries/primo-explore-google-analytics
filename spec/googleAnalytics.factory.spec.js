const googleAnalyticsConfig = __fixtures__["googleAnalyticsConfig"];
const googleAnalyticsConfigWithDefaults = __fixtures__["googleAnalyticsConfigWithDefaults"];
const googleAnalyticsConfigWithNullExternalURL = __fixtures__["googleAnalyticsConfigWithNullExternalURL"];

Object.freeze(googleAnalyticsConfig);
Object.freeze(googleAnalyticsConfigWithDefaults);

describe('googleAnalyticsService', () => {

  describe("with default config", () => {
    beforeEach(module('googleAnalytics', function($provide) {
      $provide.constant('googleAnalyticsConfig', googleAnalyticsConfigWithDefaults);
    }));

    let gaInjectionService;
    beforeEach(inject((_gaInjectionService_) => {
      gaInjectionService = _gaInjectionService_;
    }));

    it('should have getters for inlineCode and externalScriptURL', () => {
      expect(gaInjectionService.$getExternalSource).toBeDefined();
      expect(gaInjectionService.$getInlineCode).toBeDefined();
    });

    it('should have injectGACode defined on the service', () => {
      expect(gaInjectionService.injectGACode).toBeDefined();
    });

    describe('injectGACode', () => {

      let scripts;
      beforeEach(() => {
        const getScripts = () => document.head.querySelectorAll('script');
        Array.from(getScripts()).forEach(script => script.parentNode.removeChild(script));
        gaInjectionService.injectGACode();
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

    let gaInjectionService;
    beforeEach(inject((_gaInjectionService_) => {
      gaInjectionService = _gaInjectionService_;
    }));

    it('should have getters for inlineCode and externalScriptURL', () => {
      expect(gaInjectionService.$getExternalSource).toBeDefined();
      expect(gaInjectionService.$getInlineCode).toBeDefined();
    });

    it('should have injectGACode defined on the service', () => {
      expect(gaInjectionService.injectGACode).toBeDefined();
    });

    describe('injectGACode', () => {

      let scripts;
      beforeEach(() => {
        const getScripts = () => document.head.querySelectorAll('script');
        Array.from(getScripts()).forEach(script => script.parentNode.removeChild(script));
        gaInjectionService.injectGACode();
        scripts = getScripts();
      });

      it('should add the config\'s external script tag', () => {
        const src = scripts[0].src;
        expect(src).toEqual(googleAnalyticsConfig.externalScriptURL);
      });

      it('should add the config\'s inline script tag', () => {
        const innerText = scripts[1].innerText.replace(/\s+/g,' ').trim();
        expect(innerText).toEqual(googleAnalyticsConfig.inlineScript);
      });
    });

  });

  describe("with null external script", () => {
    beforeEach(module('googleAnalytics', function($provide) {
      $provide.constant('googleAnalyticsConfig', googleAnalyticsConfigWithNullExternalURL);
    }));

    let gaInjectionService;
    beforeEach(inject((_gaInjectionService_) => {
      gaInjectionService = _gaInjectionService_;
    }));

    let scripts;
    beforeEach(() => {
      const getScripts = () => document.head.querySelectorAll('script');
      Array.from(getScripts()).forEach(script => script.parentNode.removeChild(script));
      gaInjectionService.injectGACode();
      scripts = getScripts();
    });

    it('should have an empty external script tag', () => {
      const src = scripts[0].src;
      expect(src).toBeFalsy();
    });
  });

});
