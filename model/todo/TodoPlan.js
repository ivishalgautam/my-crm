const { default: mongoose } = require("mongoose");

const TodoPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  steps: [{ type: mongoose.Schema.Types.ObjectId, ref: "TodoPlanStep" }],
});

module.exports = mongoose.model("TodoPlan", TodoPlanSchema);
