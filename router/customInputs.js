const {
  getTextFields,
  createInput,
  deleteInput,
} = require("../controller/custom-input/customInputController");

const router = require("express").Router();

// POST
router.post("/", createInput);

// UPDATE
// router.put("/:id",);

// DELETE
router.delete("/:id", deleteInput);

// GET
router.get("/", getTextFields);

module.exports = router;
