const TodoPlan = require("../../model/todo/TodoPlan");
const TodoPlanStep = require("../../model/todo/TodoPlanStep");

// creates a new todo plan step
async function addTodoPlanStep(req, res) {
  try {
    const todoPlan = await TodoPlan.findById(req.params.id);
    if (!todoPlan)
      return res.status(404).json({ error: "Todo plan not found!" });

    const todoPlanStep = new TodoPlanStep(req.body);
    await todoPlanStep.save();

    const updatedTodoPlan = await TodoPlan.findByIdAndUpdate(req.params.id, {
      $push: { steps: todoPlanStep._id },
    });
    res.json(updatedTodoPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// updates a todo plan step
async function updateTodoPlanStep(req, res) {
  try {
    const todoPlanStep = await TodoPlanStep.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
      { runValidators: true }
    );
    if (!todoPlanStep)
      return res.status(404).json({ error: "Todo plan step not found!" });

    res.json(todoPlanStep);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// deletes a todo plan step
async function deleteTodoPlanStep(req, res) {
  try {
    const todoPlanStep = await TodoPlanStep.findByIdAndRemove(req.params.id);
    if (!todoPlanStep)
      return res.status(404).json({ error: "Todo plan step not found!" });

    res.json(todoPlanStep);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get a todo plan step
async function getTodoPlanStep(req, res) {
  try {
    const todoPlanStep = await TodoPlanStep.findById(req.params.id);
    if (!todoPlanStep)
      return res.status(404).json({ error: "Todo plan step not found!" });

    res.json(todoPlanStep);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all todo plan steps
async function getTodoPlanSteps(req, res) {
  try {
    const todoPlanSteps = await TodoPlanStep.find();
    if (!todoPlanSteps)
      return res.status(404).json({ error: "Todo plan step not found!" });

    res.json(todoPlanSteps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addTodoPlanStep,
  updateTodoPlanStep,
  deleteTodoPlanStep,
  getTodoPlanStep,
  getTodoPlanSteps,
};
