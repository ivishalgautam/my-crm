const {
  addTodo,
  addTodoToContact,
  updateTodo,
  deleteTodo,
  getTodos,
  getTodo,
} = require("../controller/todo/todoController");

const router = require("express").Router();

// POST
router.post("/", addTodo);
router.post("/:id", addTodoToContact);

// UPDATE
router.put("/:id", updateTodo);

// DELETE
router.delete("/:id", deleteTodo);

// GET
router.get("/", getTodos);
router.get("/:id", getTodo);

module.exports = router;
