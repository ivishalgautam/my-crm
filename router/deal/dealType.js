const {
  createDealType,
  updateDealType,
  deleteDealType,
  getDealType,
  getDealTypes,
  createDealStageInStageType,
} = require("../../controller/deal/dealController");
const { addDealFields } = require("../../controller/deal/fieldController");
const { validateId } = require("../../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/", createDealType);

// PUT
router.put("/:id", validateId, updateDealType);
router.put("/:id/add-stage", validateId, createDealStageInStageType);
router.put("/:id/add-field", validateId, addDealFields);

// DELETE
router.delete("/:id", validateId, deleteDealType);

// GET
router.get("/:id", validateId, getDealType);
router.get("/", getDealTypes);

module.exports = router;
