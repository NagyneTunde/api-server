const express = require("express");
const app = express();

// todo lista importálása
const { todos, archivedTodos } = require("./todos");

const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
require("body-parser");

app.use(bodyParser.json());

// api endpoints
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/test", (req, res) => {
  // res.send("<h1>Tündi</h1>");
  res.sendFile(`${__dirname}/public/test.html`);
});

// api response

// list of todos
app.get("/todos", (req, res) => {
  if (req.query.completed != undefined) {
    const completed = Boolean(req.query.completed);
    const completedTodos = todos.filter((todo) => todo.completed === completed);
    res.status(200).json(completedTodos);
  } else {
    res.status(200).json(todos);
  }
});

// list of archived todos
app.get("/todos/archived-todos", (req, res) => {
  res.json(archivedTodos);
});

// get single todo
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === req.params.id);
  if (!todo) {
    return res
      .status(404)
      .json({ message: `Todo not found with id: ${req.params.id}` });
  } else {
    res.json(todo);
  }
});

// add new todo
app.post("/todos", (req, res) => {
  console.log(req.body);
  const todo = {
    id: uuidv4(),
    task: req.body.task,
    completed: false,
  };
  todos.push(todo);
  res
    .status(201)
    .json({ message: "New todo successfully created", data: todo });
});

// task update based on id
app.put("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((todo) => todo.id === todoId);
  if (!todo) {
    return res
      .status(404)
      .json({ message: `Todo not found with ID: ${todoId}` });
  }
  todo.task = req.body.task !== undefined ? req.body.task : todo.task;
  todo.completed =
    req.body.completed !== undefined ? req.body.completed : todo.completed;
  res
    .status(204)
    .json({ message: `Todo ${todoId} successfully updated`, data: todo });
});

// delete
app.delete("/todos/:id", (res, req) => {
  const todoId = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    return res
      .status(404)
      .json({ message: `Todo not found with id: ${res.params.id}` });
  }
  archivedTodos.push(todos[todoIndex]);
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// szerver indítása
app.listen(3000, () => {
  console.log(`Server is run on port 3000`);
});
