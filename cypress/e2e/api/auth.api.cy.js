describe('API Auth', () => {
  it('deve retornar token e dados do usuário ao autenticar', () => {
    cy.fixture('user').then((user) => {
      cy.request('POST', '/api/login', {
        email: user.email,
        password: user.password,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
        expect(response.body.user).to.include({
          name: user.name,
          email: user.email,
        });
      });
    });
  });
});
