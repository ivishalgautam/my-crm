const {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  getNote,
  addNoteToContact,
} = require("../controller/note/noteController");
const router = require("express").Router();

// POST
router.post("/", addNote);
router.post("/:id", addNoteToContact);

// UPDATE
router.put("/:id", updateNote);

// DELETE
router.delete("/:id", deleteNote);

// GET
router.get("/", getNotes);
router.get("/:id", getNote);

module.exports = router;
