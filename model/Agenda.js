const { default: mongoose } = require("mongoose");

const AgendaSchema = new mongoose.Schema({
  overdue_todos: { type: Boolean, default: false },
  todays_birthdays: { type: Boolean, default: false },
  due_todos_today: { type: Boolean, default: false },
  today_special_events: { type: Boolean, default: false },
  today_appointments: { type: Boolean, default: false },
  emails: {
    type: Array,
    default: [],
  },
  when_to_send: {
    type: String,
    enum: ["everyday", "weekday"],
    default: "everyday",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Agenda", AgendaSchema);
