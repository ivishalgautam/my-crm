const router = require("express").Router();
const login = require("../../controller/auth/authController");

// POST
router.post("/login", login);

module.exports = router;
