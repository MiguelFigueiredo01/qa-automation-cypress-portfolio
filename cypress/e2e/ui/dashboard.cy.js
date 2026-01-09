const DashboardPage = require('../../pages/DashboardPage');

describe('Dashboard UI', () => {
  beforeEach(() => {
    cy.fixture('user').as('user');
    cy.fixture('items').as('items');
  });

  it('deve renderizar itens usando intercept', function () {
    cy.intercept('GET', '/api/items', {
      statusCode: 200,
      body: this.items,
    }).as('getItems');

    cy.loginViaApi(this.user.email, this.user.password);

    cy.wait('@getItems');
    DashboardPage.shouldShowWelcome(this.user.name);
    cy.selectByCy('item').should('have.length', this.items.items.length);
  });
});
