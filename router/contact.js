const { validateId } = require("../middleware/verifyId");
const {
  createContact,
  updateContact,
  deleteContact,
  getContacts,
  getContact,
  deleteAllContacts,
} = require("../controller/contact/contactController");
const { createContactDeal } = require("../controller/deal/dealController");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();

// POST
router.post("/", verifyTokenAndAdmin, createContact); // admin only

// UPDATE
router.put("/:id", validateId, updateContact);
router.put("/:id/add-stage", validateId, createContactDeal);

// DELETE
// router.delete("/deleteAll", deleteAllContacts);
router.delete("/:id", validateId, verifyTokenAndAdmin, deleteContact); // admin only

// GET
router.get("/:id", validateId, getContact);
router.get("/", verifyTokenAndAdmin, getContacts); // admin only

module.exports = router;
