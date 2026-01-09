const todoForm = document.querySelector("[data-cy=todo-form]");
const todoInput = document.querySelector("[data-cy=todo-input]");
const todoList = document.querySelector("[data-cy=todo-list]");
const todoCount = document.querySelector("[data-cy=todo-count]");
const statusValue = document.querySelector("[data-cy=status-value]");

const renderTodos = (todos) => {
  todoList.innerHTML = "";
  todoCount.textContent = `${todos.length} itens`;

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.setAttribute("data-cy", "todo-item");
    li.textContent = todo.title;
    todoList.appendChild(li);
  });
};

const fetchTodos = async () => {
  const response = await fetch("/api/todos");
  const payload = await response.json();
  return payload.data;
};

const fetchStatus = async () => {
  const response = await fetch("/api/health");
  const payload = await response.json();
  statusValue.textContent = payload.status;
};

const init = async () => {
  await fetchStatus();
  const todos = await fetchTodos();
  renderTodos(todos);
};

const addTodo = async (title) => {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível salvar a tarefa");
  }

  const payload = await response.json();
  return payload.data;
};

todoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = todoInput.value.trim();

  if (!title) {
    return;
  }

  try {
    const created = await addTodo(title);
    const current = await fetchTodos();
    renderTodos([created, ...current.filter((todo) => todo.id !== created.id)]);
    todoInput.value = "";
    todoInput.focus();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

init();
