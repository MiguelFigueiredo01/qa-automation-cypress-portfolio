const { apiPaths } = require("../../utils/api");

const todoPayload = require("../../fixtures/todo.json");

describe("API de tarefas", () => {
  it("retorna status de saúde", () => {
    cy.request(apiPaths.health).its("status").should("eq", 200);
  });

  it("cria uma nova tarefa", () => {
    cy.request("POST", apiPaths.todos, todoPayload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.title).to.eq(todoPayload.title);
    });
  });
});
