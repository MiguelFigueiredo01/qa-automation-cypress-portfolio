const homePage = require("../../pages/homePage");
const { apiPaths } = require("../../utils/api");

describe("Fluxo de tarefas", () => {
  it("adiciona uma nova tarefa com intercepts", () => {
    cy.intercept("GET", apiPaths.todos).as("getTodos");
    cy.intercept("POST", apiPaths.todos).as("createTodo");

    homePage.visit();

    cy.wait("@getTodos");
    homePage.statusValue().should("contain", "ok");

    homePage.todoInput().type("Validar fluxo de login");
    homePage.todoSubmit().click();

    cy.wait("@createTodo")
      .its("response.statusCode")
      .should("eq", 201);
    cy.wait("@getTodos");

    homePage.todoItems().first().should("contain", "Validar fluxo de login");
  });
});
