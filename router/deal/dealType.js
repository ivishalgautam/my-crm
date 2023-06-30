const {
  createDealType,
  updateDealType,
  deleteDealType,
  getDealType,
  getDealTypes,
} = require("../../controller/deal/dealController");
const {
  addDealFields,
  deleteDealFields,
  updateDealFields,
} = require("../../controller/deal/fieldController");
const { validateId } = require("../../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/", createDealType);

// PUT
router.put("/:id", validateId, updateDealType);
// router.put("/:id/add-stage", validateId, createDealStageInStageType);
router.put("/:id/add-field", validateId, addDealFields);
router.put("/:id/update-field", validateId, updateDealFields);

// DELETE
router.delete("/:id", validateId, deleteDealType);
router.delete("/:id/delete-field", validateId, deleteDealFields);

// GET
router.get("/:id", validateId, getDealType);
router.get("/", getDealTypes);

module.exports = router;
