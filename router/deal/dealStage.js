const {
  deleteDealStage,
  getDealStage,
  getDealStages,
  addDealStage,
} = require("../../controller/deal/dealController");
const { validateId } = require("../../middleware/verifyId");

const router = require("express").Router();

// POST
// router.post("/", createDealStage);

// PUT
// router.put("/:id", validateId, updateDealStage);
router.put("/:id/add-stage", validateId, addDealStage);

// DELETE
router.delete("/:id", validateId, deleteDealStage);

// GET
router.get("/:id", validateId, getDealStage);
router.get("/", getDealStages);

module.exports = router;
