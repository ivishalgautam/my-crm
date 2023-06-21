const { validateId } = require("../middleware/verifyId");
const {
  createContact,
  updateContact,
  deleteContact,
  getContacts,
  getContact,
} = require("../controller/contact/contactController");

const router = require("express").Router();

// POST
router.post("/", createContact);

// UPDATE
router.put("/:id", validateId, updateContact);

// DELETE
router.delete("/:id", validateId, deleteContact);

// GET
router.get("/:id", getContact);
router.get("/", getContacts);

module.exports = router;
