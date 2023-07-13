const router = require("express").Router();
const {
  createFollowUp,
  getFollowUps,
  createContactFollowUp,
} = require("../controller/followup/followUpController");

// POST
router.post("/", createFollowUp);
router.post("/:id", createContactFollowUp); // add follow-up to contact

// GET
router.get("/", getFollowUps);

module.exports = router;
