const {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  getNote,
} = require("../controller/notes/noteController");
const router = require("express").Router();

// POST
router.post("/", addNote);

// UPDATE
router.put("/:id", updateNote);

// DELETE
router.delete("/:id", deleteNote);

// GET
router.get("/", getNotes);
router.get("/:id", getNote);

module.exports = router;
