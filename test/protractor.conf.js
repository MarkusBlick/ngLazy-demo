exports.config = {
  specs: [
    './e2e/**/*.spec.js'
  ],

  chromeDriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver',
  baseUrl: 'http://localhost:9000'
}
