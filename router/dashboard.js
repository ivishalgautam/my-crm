const {
  getRecentContact,
  getOverDueTodos,
  getEvents,
} = require("../controller/dashboard/dashboardController");

const router = require("express").Router();

// contact
router.get("/recent-contacts", getRecentContact);

// todos
router.get("/todos", getOverDueTodos);

// events
router.get("/events", getEvents);
module.exports = router;
