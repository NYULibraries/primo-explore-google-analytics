module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      'spec/fixtures/**/*.json',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/@babel/polyfill/dist/polyfill.js',
      'js/**/*.js',
      'spec/**/*.js',
      'spec/**/*.spec.js'
    ],
    preprocessors: {
      'js/**/*.js': ['babel'],
      'spec/**/*.spec.js': ['babel'],
      'spec/fixtures/**/*.json': ['json_fixtures'],
    },
    jsonFixturesPreprocessor: {
      stripPrefix: "spec/fixtures/"
    }
  });
};
