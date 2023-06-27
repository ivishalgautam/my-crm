const {
  createDeal,
  updateDeal,
  deleteDeal,
  getDeal,
  getDeals,
} = require("../../controller/deal/dealController");
const { validateId } = require("../../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/", createDeal);

// UPDATE
router.put("/:id", validateId, updateDeal);

// DELETE
router.delete("/:id", validateId, deleteDeal);

// GET
router.get("/:id", validateId, getDeal); //get one deal with id
router.get("/", getDeals); //get all deals

module.exports = router;