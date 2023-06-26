const {
  addData,
  updateData,
  deleteData,
  getData,
  getAllData,
} = require("../controller/contact-data/dataController");

const router = require("express").Router();

// POST
router.post("/", addData);

// PUT
router.put("/:id");

// DELETE
router.delete("/:id");

// GET
router.get("/:id", getData);
router.get("/", getAllData);

module.exports = router;
