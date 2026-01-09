class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillEmail(email: string) {
    cy.selectByCy('login-email').clear().type(email);
  }

  fillPassword(password: string) {
    cy.selectByCy('login-password').clear().type(password);
  }

  submit() {
    cy.selectByCy('login-submit').click();
  }

  errorMessage() {
    return cy.selectByCy('login-error');
  }
}

export const loginPage = new LoginPage();
