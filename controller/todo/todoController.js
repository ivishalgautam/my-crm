const Contact = require("../../model/Contact");
const Todo = require("../../model/todo/Todo");
const TodoPlan = require("../../model/todo/TodoPlan");

// add todo
async function addTodo(req, res) {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// asign todo plan
async function assignTodoPlan(req, res) {
  try {
    const todoPlans = await TodoPlan.findById(req.params.id).populate("steps");

    let todos = [];

    for (const step of todoPlans.steps) {
      const date = new Date();
      const todo = new Todo();
      todo.summary = `${step.summary} [${req.body.summary}]`;
      todo.dueDate =
        step.increment === "days"
          ? date.setDate(date.getDate() + Number(step.period))
          : step.increment === "weeks"
          ? date.setDate(date.getDate() + Number(step.period) * 7)
          : step.increment === "months"
          ? date.setMonth(date.getMonth() + Number(step.period))
          : date.setFullYear(date.getFullYear() + Number(step.period));
      todos.push(todo);
    }

    await Todo.insertMany(todos);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// add todo to particular contact
async function addTodoToContact(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "contact not found!" });

    const newTodo = new Todo(req.body);
    await newTodo.save();

    await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { todos: newTodo._id },
      },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update todo
async function updateTodo(req, res) {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) return res.status(404).json({ error: "todo not found!" });

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete todo
async function deleteTodo(req, res) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: "todo not found!" });
    res.json("todo deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get a todo
async function getTodo(req, res) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "todo not found!" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all todos
async function getTodos(req, res) {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addTodo,
  assignTodoPlan,
  updateTodo,
  deleteTodo,
  getTodo,
  getTodos,
  addTodoToContact,
};
