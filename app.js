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
  //res.send("<h1>Tündi</h1>");
  res.sendFile(`${__dirname}/public/test.html`);
});

// szerver indítása
app.listen(3000, () => {
  console.log(`Server is run on port 3000`);
});
