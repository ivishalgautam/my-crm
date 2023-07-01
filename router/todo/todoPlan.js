const {
  addTodoPlan,
  updateTodoPlan,
  deleteTodoPlan,
  getTodoPlans,
  getTodoPlan,
} = require("../../controller/todo/todoPlanController");

const router = require("express").Router();

// POST
router.post("/", addTodoPlan);

// PUT
router.put("/:id", updateTodoPlan);

// DELETE
router.delete("/:id", deleteTodoPlan);

// GET
router.get("/", getTodoPlans);
router.get("/:id", getTodoPlan);

module.exports = router;
