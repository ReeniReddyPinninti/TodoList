const express = require("express");
const path = require("path");
const cors = require("cors"); // import CORS
const app = express();

app.use(cors()); // allow all origins
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

let todos = [];

// API routes
app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
  const todo = { id: todos.length + 1, text: req.body.text };
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).end();
});

app.listen(3000, () => console.log("Todo app running at http://localhost:3000"));