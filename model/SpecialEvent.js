const { default: mongoose } = require("mongoose");

const SpecialEventSchema = new mongoose.Schema({
  occasion: {
    type: String,
    enum: ["Birthday", "Anniversary", "Other"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("SpecialEvent", SpecialEventSchema);
