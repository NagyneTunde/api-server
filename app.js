const express = require("express");
const app = express();

// todo lista importálása
const todos = require("./todos");

console.log(__dirname);

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
  if (req.query.id !== undefined) {
    const id = Number(req.query.id);
    const searchedTodo = todos.filter((todo) => todo.id === id);
    res.status(200).json(searchedTodo);
  } else {
    res.status(200).json(todos);
  }
});

// get single todo
app.get("/todos/:id", (req, res) => {
  const searchedId = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === searchedId);
  if (!todo) {
    return res
      .status(404)
      .json({ message: `Todo not found with id: ${req.params.id}` });
  } else {
    res.json(todo);
  }
});

// szerver indítása
app.listen(3000, () => {
  console.log(`Server is run on port 3000`);
});
