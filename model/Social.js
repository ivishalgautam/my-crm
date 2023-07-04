const { default: mongoose } = require("mongoose");

const SocialSchema = new mongoose.Schema({
  link: { type: String, required: true },
});

module.exports = mongoose.model("Social", SocialSchema);
