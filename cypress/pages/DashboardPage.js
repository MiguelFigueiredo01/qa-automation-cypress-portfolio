const selectors = require('../utils/selectors');

class DashboardPage {
  visit() {
    cy.visit('/dashboard');
  }

  shouldShowWelcome(name) {
    cy.get(selectors.welcomeMessage).should('contain', name);
  }

  shouldListItems() {
    cy.get(selectors.itemCard).should('have.length.greaterThan', 0);
  }

  logout() {
    cy.get(selectors.logoutButton).click();
  }
}

module.exports = new DashboardPage();
