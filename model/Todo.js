const { default: mongoose } = require("mongoose");

const NoteSchema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  summary: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Normal", "Low"],
    default: "Normal",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Email", "Letter", "Phone Call"],
    default: "",
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
