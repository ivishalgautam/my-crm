const router = require("express").Router();
const {
  addAgenda,
  updateAgenda,
  getAgenda,
} = require("../controller/agenda-assist/agendaController");
const { validateId } = require("../middleware/verifyId");
require("../controller/email/agendaEmail");

// POST
router.post("/", addAgenda);

// UPDATE
router.put("/:id", validateId, updateAgenda);

// GET
router.get("/", getAgenda);

module.exports = router;
