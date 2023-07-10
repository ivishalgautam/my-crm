const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../../controller/auth/userController");
const { validateId } = require("../../middleware/verifyId");

const router = require("express").Router();

//POST
router.post("/", createUser);

// PUT
router.put("/:id", validateId, updateUser);

// DELETE
router.delete("/:id", validateId, deleteUser);

// GET
router.get("/:id", validateId, getUser);
router.get("/", getUsers);

module.exports = router;
