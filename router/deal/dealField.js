const router = require("express").Router();
const {
  addDealFields,
  updateDealFields,
  deleteDealFields,
} = require("../../controller/deal/fieldController");
const { validateId } = require("../../middleware/verifyId");

router.post("/:id", validateId, addDealFields);
router.put("/:id", validateId, updateDealFields);
router.delete("/:id", validateId, deleteDealFields);

module.exports = router;
