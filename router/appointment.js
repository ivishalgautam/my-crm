const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
  getAppointments,
} = require("../controller/appointment/appointmentController");

const router = require("express").Router();

// POST
router.post("/:id", createAppointment);

// PUT
router.put("/:id", updateAppointment);

// DELETE
router.delete("/:id", deleteAppointment);

// GET
router.get("/:id", getAppointment);
router.get("/", getAppointments);

module.exports = router;
