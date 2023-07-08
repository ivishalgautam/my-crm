const CronJob = require("cron").CronJob;
const Agenda = require("../../model/AgendaAssist");
const Appointment = require("../../model/Appointment");
const Contact = require("../../model/Contact");
const SpecialEvent = require("../../model/SpecialEvent");
const Todo = require("../../model/todo/Todo");

async function sendAgendaEmail(req, res) {}

async function checkAgendaAndSendEmail() {
  try {
    const agenda = await Agenda.findOne();
    const {
      overdue_todos,
      todays_birthdays,
      due_todos_today,
      today_special_events,
      today_appointments,
    } = agenda;
    // const keys = Object.keys(agenda[0]._doc);

    const info = {};
    const todayString = new Date().toISOString().split("T")[0];

    // check overdue todos
    if (overdue_todos) {
      const date = new Date();
      const todos = await Todo.find({ dueDate: { $lt: date } });
      info.overdue_todos = todos;
    }

    // check todays birthdays
    if (todays_birthdays) {
      const birthdays = await Contact.aggregate([
        {
          $addFields: {
            dobDate: { $dateToString: { format: "%Y-%m-%d", date: "$dob" } },
          },
        },
        {
          $match: {
            dobDate: todayString,
          },
        },
      ]);

      info.todayBirthdays = birthdays;
    }

    // check due todos today
    if (due_todos_today) {
      const todos = await Todo.aggregate([
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
          },
        },
      ]);
      info.dueTodosToday = todos;
      // console.log(todos);
    }

    // check today special events
    if (today_special_events) {
      const specialEvents = await SpecialEvent.aggregate([
        {
          $addFields: {
            todayDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
        },
        {
          $match: {
            todayDate: todayString,
          },
        },
      ]);
      info.todaySpecialEvents = specialEvents;
    }

    // check today appointments
    if (today_appointments) {
      const todayAppointments = await Appointment.aggregate([
        {
          $addFields: {
            todayDate: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
        },
        {
          $match: {
            todayDate: todayString,
          },
        },
      ]);
      info.todayAppointments = todayAppointments;
    }
    // console.log(info);
  } catch (error) {
    console.log(error.message);
  }
}

// checkAgendaAndSendEmail();

// Run every minute
const job = new CronJob(
  "*/10 * * * * *",
  () => {
    checkAgendaAndSendEmail();
  },
  null,
  true,
  "Asia/Kolkata"
);
job.start();

module.exports = { job };
