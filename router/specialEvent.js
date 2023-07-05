const {
  addSpecialEvent,
  updateSpecialEvent,
  deleteSpecialEvent,
  getSpecialEvent,
  getSpecialEvents,
} = require("../controller/special-event/specialEventController");
const { validateId } = require("../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/", addSpecialEvent);
// PUT
router.put("/:id", validateId, updateSpecialEvent);
// DELETE
router.delete("/:id", validateId, deleteSpecialEvent);
// GET
router.get("/:id", validateId, getSpecialEvent);
router.get("/", getSpecialEvents);

module.exports = router;
