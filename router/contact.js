const { validateId } = require("../middleware/verifyId");
const {
  createContact,
  updateContact,
  deleteContact,
  getContacts,
  getContact,
} = require("../controller/contact/contactController");
const { createContactDeal } = require("../controller/deal/dealController");

const router = require("express").Router();

// POST
router.post("/", createContact);

// UPDATE
router.put("/:id", validateId, updateContact);
router.put("/:id/add-stage", validateId, createContactDeal);

// DELETE
router.delete("/:id", validateId, deleteContact);

// GET
router.get("/:id", validateId, getContact);
router.get("/", getContacts);

module.exports = router;
