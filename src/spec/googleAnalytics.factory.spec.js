import googleAnalyticsConfig from './fixtures/googleAnalyticsConfig';
import googleAnalyticsConfigWithDefaults from './fixtures/googleAnalyticsConfigWithDefaults';
import googleAnalyticsConfigWithNullExternalURL from './fixtures/googleAnalyticsConfigWithNullExternalURL';

Object.freeze(googleAnalyticsConfig);
Object.freeze(googleAnalyticsConfigWithDefaults);
Object.freeze(googleAnalyticsConfigWithNullExternalURL);

describe('googleAnalyticsService', () => {

  let consoleSpy;
  beforeEach(() => {
    consoleSpy = spyOn(console, 'log');
  });

  describe("with default config", () => {
    beforeEach(module('googleAnalytics', ($provide) => {
      $provide.constant('googleAnalyticsConfig', googleAnalyticsConfigWithDefaults);
    }));

    let gaInjectionService;
    beforeEach(inject((_gaInjectionService_) => {
      gaInjectionService = _gaInjectionService_;
    }));

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
    beforeEach(module('googleAnalytics', ($provide) => {
      $provide.constant('googleAnalyticsConfig', googleAnalyticsConfig);
    }));

    let gaInjectionService;
    beforeEach(inject((_gaInjectionService_) => {
      gaInjectionService = _gaInjectionService_;
    }));

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

      it('executes script content', () => {
        expect(consoleSpy).toHaveBeenCalledWith('Hello world');
      });
    });
  });

  describe("with null external script", () => {
    beforeEach(module('googleAnalytics', ($provide) => {
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

    it('has only one inline script', () => {
      expect(scripts.length).toEqual(1);
      const innerText = scripts[0].innerText.replace(/\s+/g,' ').trim();
      expect(innerText).toEqual(googleAnalyticsConfigWithNullExternalURL.inlineScript);
    });
  });

  describe('with an array of configurations', () => {
    beforeEach(module('googleAnalytics', ($provide) => {
      $provide.constant('googleAnalyticsConfig', [
        googleAnalyticsConfig,
        googleAnalyticsConfigWithNullExternalURL
      ]);
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

    it('has three inline scripts', () => {
      expect(scripts.length).toEqual(3);
    });

    it('the scripts are inserted in the correct order', () => {
      const innerText = scripts[1].innerText.replace(/\s+/g, ' ').trim();
      expect(innerText).toEqual(googleAnalyticsConfigWithNullExternalURL.inlineScript);
    });
  });

  describe('with a defined target', () => {
    beforeEach(module('googleAnalytics', ($provide) => {
      $provide.constant('googleAnalyticsConfig', Object.assign({}, googleAnalyticsConfigWithDefaults, { target: 'body' }));
    }));

    let gaInjectionService;
    beforeEach(inject((_gaInjectionService_) => {
      gaInjectionService = _gaInjectionService_;
    }));

    describe('injectGACode', () => {
      let scripts;
      beforeEach(() => {
        const getScripts = () => document.querySelector('body').querySelectorAll('script');
        Array.from(getScripts()).forEach(script => script.parentNode.removeChild(script));
        gaInjectionService.injectGACode();
        scripts = getScripts();
      });

      it('should add the default external script tag to the specified target', () => {
        const src = scripts[0].src;
        expect(src).toEqual(`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsConfig.trackingId}`);
      });

      it('should add the default inline script tag to the specified target', () => {
        const innerText = scripts[1].innerText.replace(/\s+/g, ' ').trim();
        expect(innerText).toContain(`gtag('config', '${googleAnalyticsConfig.trackingId}')`);
      });
    });
  });
});
