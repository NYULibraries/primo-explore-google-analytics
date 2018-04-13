module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage', 'coveralls'],
    browsers: ['PhantomJS'],
    basePath: 'src/',
    files: [
      'spec/fixtures/**/*.json',
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '../node_modules/@babel/polyfill/dist/polyfill.js',
      'js/**/*.js',
      'spec/**/*.js',
    ],
    preprocessors: {
      'js/**/*.js': ['webpack', 'sourcemap'],
      'spec/**/*.spec.js': ['babel', 'sourcemap'],
      'spec/fixtures/**/*.json': ['json_fixtures'],
    },
    jsonFixturesPreprocessor: {
      stripPrefix: "spec/fixtures/"
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      devtool: 'inline-source-map'
    }
  });
};
