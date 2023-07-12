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
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
require("../controller/email/emailController");

// POST
router.post("/:id", validateId, createAppointment);

// PUT
router.put("/:id", validateId, updateAppointment);

// DELETE
router.delete(
  "/:id",
  validateId,
  verifyTokenAndAuthorization,
  deleteAppointment
);
router.delete("/", verifyTokenAndAuthorization, deleteAllAppointments);

// GET
router.get("/:id", validateId, getAppointment);
router.get("/", verifyTokenAndAuthorization, getAppointments);

module.exports = router;
