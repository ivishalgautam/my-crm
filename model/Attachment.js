const { default: mongoose } = require("mongoose");

const AttachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
});

module.exports = mongoose.model("Attachment", AttachmentSchema);
