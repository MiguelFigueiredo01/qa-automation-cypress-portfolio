const LoginPage = require('../../pages/LoginPage');

describe('Login UI', () => {
  beforeEach(() => {
    cy.fixture('user').as('user');
  });

  it('deve autenticar com sucesso via UI', function () {
    LoginPage.visit();
    LoginPage.fillEmail(this.user.email);
    LoginPage.fillPassword(this.user.password);
    LoginPage.submit();

    cy.url().should('include', '/dashboard');
    cy.selectByCy('welcome').should('contain', this.user.name);
  });

  it('deve exibir mensagem de erro ao logar com dados inválidos', () => {
    LoginPage.visit();
    LoginPage.fillEmail('invalido@example.com');
    LoginPage.fillPassword('senha-incorreta');
    LoginPage.submit();

    LoginPage.errorShouldContain('Credenciais inválidas');
  });
});
