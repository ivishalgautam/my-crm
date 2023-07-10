const router = require("express").Router();
const login = require("../../controller/auth/authController");

// POST
router.get("/login", login);

module.exports = router;
