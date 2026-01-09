Cypress.Commands.add('selectByCy', (value) => {
  return cy.get(`[data-cy="${value}"]`);
});

Cypress.Commands.add('loginViaApi', (email, password) => {
  cy.request('POST', '/api/login', { email, password }).then((response) => {
    expect(response.status).to.eq(200);
    const { token } = response.body;

    cy.setCookie('auth_token', token);

    cy.visit('/dashboard', {
      onBeforeLoad(win) {
        win.localStorage.setItem('auth_token', token);
      },
    });
  });
});
