const router = require("express").Router();
const {
  createFollowUp,
  getFollowUps,
} = require("../controller/followup/followUpController");

// POST
router.post("/", createFollowUp);

// GET
router.get("/", getFollowUps);

module.exports = router;
