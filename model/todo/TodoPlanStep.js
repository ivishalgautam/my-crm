const { default: mongoose } = require("mongoose");

const TodoPlanStepSchema = new mongoose.Schema({
  summary: { type: String, required: true },
  period: { type: String, required: true },
  increment: {
    type: String,
    enum: ["days", "weeks", "months", "years"],
    default: "days",
  },
  category: {
    type: String,
    enum: ["noCategory", "email", "letter", "phoneCall"],
    default: "noCategory",
  },
});

module.exports = mongoose.model("TodoPlanStep", TodoPlanStepSchema);
