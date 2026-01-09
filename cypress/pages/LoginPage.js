const selectors = require('../utils/selectors');

class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    cy.get(selectors.emailInput).clear().type(email);
  }

  fillPassword(password) {
    cy.get(selectors.passwordInput).clear().type(password, { log: false });
  }

  submit() {
    cy.get(selectors.submitButton).click();
  }

  errorShouldContain(text) {
    cy.get(selectors.errorMessage).should('contain', text);
  }
}

module.exports = new LoginPage();
