const router = require("express").Router();
const {
  addAgenda,
  updateAgenda,
  getAgenda,
} = require("../controller/agenda-assist/agendaController");
const { validateId } = require("../middleware/verifyId");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
// require("../controller/email/agendaEmail");

// POST
router.post("/", verifyTokenAndAdmin, addAgenda);

// UPDATE
router.put("/:id", validateId, verifyTokenAndAdmin, updateAgenda);

// GET
router.get("/", verifyTokenAndAdmin, getAgenda);

module.exports = router;
