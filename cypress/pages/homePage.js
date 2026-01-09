class HomePage {
  visit() {
    cy.visit("/");
  }

  todoInput() {
    return cy.getByDataCy("todo-input");
  }

  todoSubmit() {
    return cy.getByDataCy("todo-submit");
  }

  todoItems() {
    return cy.getByDataCy("todo-item");
  }

  statusValue() {
    return cy.getByDataCy("status-value");
  }
}

module.exports = new HomePage();
