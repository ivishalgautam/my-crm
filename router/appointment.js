const router = require("express").Router();
const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
  getAppointments,
  deleteAllAppointments,
} = require("../controller/appointment/appointmentController");
const { validateId } = require("../middleware/verifyId");
require("../controller/email/emailController");

// POST
router.post("/:id", validateId, createAppointment);

// PUT
router.put("/:id", validateId, updateAppointment);

// DELETE
router.delete("/:id", validateId, deleteAppointment);
router.delete("/", deleteAllAppointments);

// GET
router.get("/:id", validateId, getAppointment);
router.get("/", getAppointments);

module.exports = router;
