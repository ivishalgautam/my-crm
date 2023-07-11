const router = require("express").Router();
const { login, readUser } = require("../../controller/auth/authController");
const { verifyToken } = require("../../middleware/verifyToken");

// POST
router.post("/login", login);

// GET
router.get("/read", verifyToken, readUser);

module.exports = router;
