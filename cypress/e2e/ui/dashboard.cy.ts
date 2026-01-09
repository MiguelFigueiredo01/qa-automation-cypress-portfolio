import { dashboardPage } from '../../pages/DashboardPage';

describe('Dashboard UI', () => {
  it('carrega itens com intercept e valida renderização', () => {
    cy.intercept('GET', '/api/items', { fixture: 'items.json' }).as('getItems');
    cy.fixture('user').then((user) => {
      cy.visit('/dashboard', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', 'fake-token-123');
          win.localStorage.setItem('user', JSON.stringify(user));
        },
      });
    });

    cy.wait('@getItems');
    dashboardPage.userName().should('contain', 'Ada');
    dashboardPage.itemRows().should('have.length', 3);
    dashboardPage.items().should('contain', 'Checklist de regressão');
  });
});
