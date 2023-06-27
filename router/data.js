const {
  addData,
  updateData,
  deleteData,
  getData,
  getAllData,
} = require("../controller/contact-data/dataController");
const { validateId } = require("../middleware/verifyId");

const router = require("express").Router();

// POST
router.post("/", addData);

// PUT
router.put("/:id", validateId, updateData);

// DELETE
router.delete("/:id", validateId, deleteData);

// GET
router.get("/:id", validateId, getData);
router.get("/", getAllData);

module.exports = router;
