const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      return config;
    },
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  video: true,
  screenshotOnRunFailure: true,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'reports',
    overwrite: false,
    html: false,
    json: true,
  },
});
