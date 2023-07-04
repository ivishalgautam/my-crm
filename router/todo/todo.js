const {
  addTodo,
  addTodoToContact,
  updateTodo,
  deleteTodo,
  getTodos,
  getTodo,
  assignTodoPlan,
} = require("../../controller/todo/todoController");
const { validateId } = require("../../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/", addTodo);
router.post("/:id", validateId, addTodoToContact);
router.post("/assign-todo-plan/:id", validateId, assignTodoPlan);

// UPDATE
router.put("/:id", validateId, updateTodo);

// DELETE
router.delete("/:id", validateId, deleteTodo);

// GET
router.get("/", getTodos);
router.get("/:id", validateId, getTodo);

module.exports = router;
