Cypress.Commands.add('selectByCy', (value) => {
  return cy.get(`[data-cy="${value}"]`);
});

Cypress.Commands.add('loginViaApi', () => {
  cy.fixture('user').then((user) => {
    cy.request('POST', '/api/login', {
      email: user.email,
      password: user.password,
    }).then((response) => {
      const { token, user: userData } = response.body;
      cy.window().then((win) => {
        win.localStorage.setItem('token', token);
        win.localStorage.setItem('user', JSON.stringify(userData));
      });
    });
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      selectByCy(value: string): Chainable<JQuery<HTMLElement>>;
      loginViaApi(): Chainable<void>;
    }
  }
}

export {};
