export const validateItemsSchema = (items: Array<{ id: number; name: string }>) => {
  expect(items).to.be.an('array');
  items.forEach((item) => {
    expect(item).to.have.all.keys('id', 'name');
    expect(item.id).to.be.a('number');
    expect(item.name).to.be.a('string');
  });
};
