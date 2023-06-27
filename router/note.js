const {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  getNote,
  addNoteToContact,
} = require("../controller/note/noteController");
const { validateId } = require("../middleware/verifyId");
const router = require("express").Router();

// POST
router.post("/", addNote);
router.post("/:id", validateId, addNoteToContact);

// UPDATE
router.put("/:id", validateId, updateNote);

// DELETE
router.delete("/:id", validateId, deleteNote);

// GET
router.get("/", getNotes);
router.get("/:id", validateId, getNote);

module.exports = router;
