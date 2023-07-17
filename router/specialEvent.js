const router = require("express").Router();
const {
  addSpecialEvent,
  updateSpecialEvent,
  deleteSpecialEvent,
  getSpecialEvent,
  getSpecialEvents,
} = require("../controller/special-event/specialEventController");
const { validateId } = require("../middleware/verifyId");

// POST
router.post("/:id", addSpecialEvent);

// PUT
router.put("/:id", validateId, updateSpecialEvent);

// DELETE
router.delete("/:id", validateId, deleteSpecialEvent);

// GET
router.get("/:id", validateId, getSpecialEvent);
router.get("/", getSpecialEvents);

module.exports = router;
