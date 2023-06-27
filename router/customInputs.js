const {
  createInput,
  updateInput,
  deleteInput,
  getInput,
  getInputs,
} = require("../controller/custom-input/customInputController");
const { validateId } = require("../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/", createInput);

// PUT
router.put("/:id", validateId, updateInput);

// DELETE
router.delete("/:id", validateId, deleteInput);

// GET
router.get("/:id", validateId, getInput);
router.get("/", getInputs);

module.exports = router;
