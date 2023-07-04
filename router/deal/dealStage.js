const {
  deleteDealStage,
  getDealStage,
  getDealStages,
  addDealStage,
  updateDealStage,
} = require("../../controller/deal/dealController");
const { validateId } = require("../../middleware/verifyId");

const router = require("express").Router();

// PUT
router.post("/:id", validateId, addDealStage);
router.put("/:id", updateDealStage);

// DELETE
router.delete("/:id", validateId, deleteDealStage);

// GET
router.get("/:id", validateId, getDealStage);
router.get("/", getDealStages);

module.exports = router;
