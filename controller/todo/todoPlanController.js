const TodoPlan = require("../../model/todo/TodoPlan");
const TodoPlanStep = require("../../model/todo/TodoPlanStep");

// create new todo plan
async function addTodoPlan(req, res) {
  try {
    const todoPlan = new TodoPlan(req.body);
    await todoPlan.save();
    res.json(todoPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update todo plan
async function updateTodoPlan(req, res) {
  try {
    const todoPlan = await TodoPlan.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!todoPlan)
      return res.status(404).json({ error: "todo plan not found!" });
    res.json(todoPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// deletes todo plan
async function deleteTodoPlan(req, res) {
  try {
    const todoPlan = await TodoPlan.findByIdAndRemove(req.params.id);
    if (!todoPlan)
      return res.status(404).json({ message: "todo plan not found!" });

    await TodoPlanStep.deleteMany({ _id: { $in: todoPlan.steps } });
    res.json({ message: "todo plan deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get todo plan
async function getTodoPlan(req, res) {
  try {
    const todoPlan = await TodoPlan.findById(req.params.id);
    if (!todoPlan)
      return res.status(404).json({ error: "todo plan not found!" });
    res.json(todoPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all todo plans
async function getTodoPlans(req, res) {
  try {
    const todoPlans = await TodoPlan.find().populate("steps");
    if (todoPlans.length <= 0)
      return res.json({ message: "there are no todo plans" });
    res.json(todoPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addTodoPlan,
  updateTodoPlan,
  deleteTodoPlan,
  getTodoPlan,
  getTodoPlans,
};
