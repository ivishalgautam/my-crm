const Contact = require("../../model/Contact");
const SpecialEvent = require("../../model/SpecialEvent");
const Todo = require("../../model/todo/Todo");

// get newly added contacts
async function getRecentContact(req, res) {
  const { limit } = req.query;
  try {
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .limit(limit);
    const filtered = contacts.map((contact) => ({
      _id: contact._id,
      name: contact.firstname.primary,
      createdAt: contact.createdAt,
    }));
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// todos
async function getOverDueTodos(req, res) {
  const { type } = req.query;
  try {
    let todos;
    const date = new Date();
    const todayString = date.toISOString().split("T")[0];
    switch (type) {
      case "overdue":
        todos = await Todo.find({
          dueDate: { $lt: date },
          isCompleted: false,
        });
        break;
      case "due_today":
        todos = await Todo.aggregate([
          {
            $addFields: {
              todayDate: {
                $dateToString: { format: "%Y-%m-%d", date: "$dueDate" },
              },
            },
          },
          {
            $match: {
              todayDate: todayString,
              isCompleted: false,
            },
          },
        ]);
        break;
      case "all_open":
        todos = await Todo.find({
          isCompleted: false,
        });
        break;
      default:
        break;
    }
    res.json({ length: todos.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// birthdays
async function getEvents(req, res) {
  const { event } = req.query;
  const { time } = req.query;
  if (!event) return res.status(404).json({ error: "pass event query" });
  if (!time) return res.status(404).json({ error: "pass time query" });
  const date =
    time === "today"
      ? new Date()
      : time === "tommorow"
      ? new Date(new Date().setDate(new Date().getDate() + 1))
      : new Date();
  const dateString = date.toISOString().split("T")[0];

  try {
    let events;
    switch (event) {
      case "birthday":
        console.log(event);
        events = await SpecialEvent.aggregate([
          {
            $addFields: {
              todayDate: {
                $dateToString: { format: "%Y-%m-%d", date: "$date" },
              },
            },
          },
          {
            $match: {
              todayDate: dateString,
              occassion: "birthday",
            },
          },
        ]);
        if (!events) return res.status(404).json({ error: "not found" });
        break;
      case "anniversary":
        events = await SpecialEvent.aggregate([
          {
            $addFields: {
              todayDate: {
                $dateToString: { format: "%Y-%m-%d", date: "$date" },
              },
            },
          },
          {
            $match: {
              todayDate: dateString,
              occassion: "anniversary",
            },
          },
        ]);
        if (!events) return res.status(404).json({ error: "not found" });
        break;
      default:
        return res.status(400).json({ error: "pass valid query!" });
    }

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = { getRecentContact, getOverDueTodos, getEvents };
