const {
  addItem,
  getItems,
} = require("../controller/contact-related/controller");

const router = require("express").Router();

// POST
router.post("/", addItem);

// GET
router.get("/", getItems);

module.exports = router;
