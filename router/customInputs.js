const {
  createInput,
  updateInput,
  deleteInput,
  getInput,
  getInputs,
} = require("../controller/custom-input/customInputController");

const router = require("express").Router();

// POST
router.post("/", createInput);

// PUT
router.put("/:id", updateInput);

// DELETE
router.delete("/:id", deleteInput);

// GET
router.get("/:id", getInput);
router.get("/", getInputs);

module.exports = router;
