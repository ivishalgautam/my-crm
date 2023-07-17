const {
  getRecentContact,
  getOverDueTodos,
  getEvents,
  upcomingAppointments,
} = require("../controller/dashboard/dashboardController");

const router = require("express").Router();

// contact
router.get("/recent-contacts", getRecentContact);

// todos
router.get("/todos", getOverDueTodos);

// events
router.get("/events", getEvents);

// upcoming appointments
router.get("/upcoming-appointments", upcomingAppointments);
module.exports = router;
