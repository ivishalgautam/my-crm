const {
  createDealType,
  updateDealType,
  deleteDealType,
  getDealType,
  getDealTypes,
  getDealTypeStages,
} = require("../../controller/deal/dealController");
const { validateId } = require("../../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/", createDealType);

// PUT
router.put("/:id", validateId, updateDealType);

// DELETE
router.delete("/:id", validateId, deleteDealType);

// GET
router.get("/:id", validateId, getDealType);
router.get("/", getDealTypes);
router.get("/:id/stages", getDealTypeStages);

module.exports = router;
