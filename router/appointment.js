const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
  getAppointments,
} = require("../controller/appointment/appointmentController");
const { validateId } = require("../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/:id", validateId, createAppointment);

// PUT
router.put("/:id", validateId, updateAppointment);

// DELETE
router.delete("/:id", validateId, deleteAppointment);

// GET
router.get("/:id", validateId, getAppointment);
router.get("/", getAppointments);

module.exports = router;