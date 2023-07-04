const {
  addTodoPlanStep,
  updateTodoPlanStep,
  deleteTodoPlanStep,
  getTodoPlanStep,
  getTodoPlanSteps,
} = require("../../controller/todo/todoPlanStepController");
const { validateId } = require("../../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/:id", addTodoPlanStep);

// PUT
router.put("/:id", validateId, updateTodoPlanStep);

// DELETE
router.delete("/:id", validateId, deleteTodoPlanStep);

// GET
router.get("/:id", validateId, getTodoPlanStep);
router.get("/", getTodoPlanSteps);

module.exports = router;
