import { loginPage } from '../../pages/LoginPage';

describe('Login UI', () => {
  it('permite login com sucesso e redireciona para dashboard', () => {
    cy.fixture('user').then((user) => {
      loginPage.visit();
      loginPage.fillEmail(user.email);
      loginPage.fillPassword(user.password);
      loginPage.submit();

      cy.url().should('include', '/dashboard');
      cy.selectByCy('user-name').should('contain', user.name);
    });
  });

  it('mostra mensagem ao tentar login inválido', () => {
    loginPage.visit();
    loginPage.fillEmail('wrong@example.com');
    loginPage.fillPassword('wrong');
    loginPage.submit();

    loginPage.errorMessage().should('be.visible').and('contain', 'Credenciais inválidas');
  });
});
