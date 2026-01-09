import { validateItemsSchema } from '../../utils/schema';

describe('API - Auth e itens', () => {
  it('POST /api/login retorna token e usuário', () => {
    cy.fixture('user').then((user) => {
      cy.request('POST', '/api/login', {
        email: user.email,
        password: user.password,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
        expect(response.body.user).to.include({
          id: user.id,
          name: user.name,
          email: user.email,
        });
      });
    });
  });

  it('GET /api/items retorna lista e valida schema', () => {
    cy.request('/api/items').then((response) => {
      expect(response.status).to.eq(200);
      validateItemsSchema(response.body);
    });
  });
});
