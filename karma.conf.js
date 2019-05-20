const webpack = require('webpack');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: [
      'spec',
      'junit',
      'coverage',
      'coveralls'
    ],
    browsers: ['ChromeHeadless', 'ChromiumHeadless_without_sandbox'],
    basePath: './',
    files: [
      require.resolve('angular/angular.js'),
      require.resolve('angular-mocks/angular-mocks.js'),
      'src/index.js',
      'src/spec/**/*.spec.js',
    ],
    preprocessors: {
      'src/index.js': ['webpack', 'sourcemap'],
      'src/spec/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }]
      },
      devtool: 'inline-source-map',
      externals: {
        angular: 'angular',
      },
      plugins: [
        new webpack.DefinePlugin({
          module: 'window.module',
        }),
      ],
    },
    customLaunchers: {
      ChromiumHeadless_without_sandbox: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox']
      }
    },
    junitReporter: {
      outputDir: 'test-results'
    },
    coverageReporter: {
      type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
      dir: 'test-results/coverage',
    },
  });
};
