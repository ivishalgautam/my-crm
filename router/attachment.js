const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {
  createAttachment,
  deleteAttachment,
  getAttachments,
} = require("../controller/attachment/attachmentController");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const folderPath = path.join(__dirname, "../uploads");

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    callback(null, folderPath);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const uploads = multer({ storage });

// POST
router.post("/:id", uploads.array("files", 5), createAttachment);

// DELETE
router.delete("/:id", deleteAttachment);

// GET
router.get("/", getAttachments);
module.exports = router;
