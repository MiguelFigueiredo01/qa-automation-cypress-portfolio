const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

let todos = [
  { id: 1, title: "Revisar cobertura dos testes", done: false },
  { id: 2, title: "Validar fluxo de checkout", done: true },
];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/todos", (_req, res) => {
  res.json({ data: todos });
});

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Título é obrigatório" });
  }

  const nextTodo = {
    id: Date.now(),
    title,
    done: false,
  };

  todos = [nextTodo, ...todos];

  return res.status(201).json({ data: nextTodo });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Demo app rodando em http://localhost:${port}`);
});
