const {
  addSocial,
  updateSocial,
  deleteSocial,
  getSocial,
  getSocials,
} = require("../controller/social/socialController");
const { validateId } = require("../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/:id", validateId, addSocial);

// UPDATE
router.put("/:id", validateId, updateSocial);

// DELETE
router.delete("/:id", validateId, deleteSocial);

// GET
router.get("/", getSocials);
router.get("/:id", validateId, getSocials);

module.exports = router;
