class DashboardPage {
  visit() {
    cy.visit('/dashboard');
  }

  userName() {
    return cy.selectByCy('user-name');
  }

  items() {
    return cy.selectByCy('items');
  }

  itemRows() {
    return cy.selectByCy('item-row');
  }
}

export const dashboardPage = new DashboardPage();
