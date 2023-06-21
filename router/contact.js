const router = require("express").Router();

// post a contact
router.post("/", (req, res) => {
  res.json("post contact");
});

module.exports = router;
