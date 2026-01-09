describe('API Items', () => {
  it('deve retornar lista de itens', () => {
    cy.request('/api/items').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.items).to.be.an('array');
      expect(response.body.items[0]).to.have.keys(['id', 'name', 'category']);
    });
  });
});
