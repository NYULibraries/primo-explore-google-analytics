const googleAnalyticsConfig = __fixtures__["googleAnalyticsConfig"];
const googleAnalyticsConfigwithDefaults = __fixtures__["googleAnalyticsConfigwithDefaults"];

Object.freeze(googleAnalyticsConfig);
Object.freeze(googleAnalyticsConfigwithDefaults);

describe('googleAnalyticsService', () => {
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

  describe('injectGACode', () => {
    it('should be defined on the service', () => {
      expect(gaService.injectGACode).toBeDefined();
    });

    describe("with default config", () => {
      it('should add an external script tag based on the default value', () => {

      });
    });

    describe("with defined script config", () => {
      it('should add an external script tag to the head based on the config value', () => {

      });

      it('should add an inline script tag to the head based on the config value', () => {

      });
    });
  });

});
