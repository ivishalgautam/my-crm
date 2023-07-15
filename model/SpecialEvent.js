const { default: mongoose } = require("mongoose");

const SpecialEventSchema = new mongoose.Schema({
  occassion: {
    type: String,
    enum: ["birthday", "anniversary", "Other"],
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
