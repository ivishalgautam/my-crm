const {
  createDeal,
  updateDeal,
  deleteDeal,
  getDeal,
  getDeals,
} = require("../controller/deal/dealController");

const router = require("express").Router();

// POST
router.post("/", createDeal);

// UPDATE
router.put("/:id", updateDeal);

// DELETE
router.delete("/:id", deleteDeal);

// GET
router.get("/:id", getDeal); //get one deal with id
router.get("/", getDeals); //get all deals

module.exports = router;
