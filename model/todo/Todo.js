const { default: mongoose } = require("mongoose");

const TodoSchema = new mongoose.Schema({
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
  },
  category: {
    type: String,
    enum: ["No Category", "Email", "Letter", "Phone Call"],
    default: "No Category",
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
