const CronJob = require("cron").CronJob;
const Agenda = require("../../model/Agenda");
const Appointment = require("../../model/Appointment");
const Contact = require("../../model/Contact");
const SpecialEvent = require("../../model/SpecialEvent");
const Todo = require("../../model/todo/Todo");
const nodemailer = require("nodemailer");

async function sendAgendaEmail(data) {
  const dataStr = JSON.stringify(data);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    let mailOption = {
      from: "your-email@gmail.com",
      to: "vishal.gautam.5812@gmail.com",
      subject: "testin crm",
      text: dataStr,
    };
    await transporter.sendMail(mailOption, (error, info) => {
      console.log(info.messageId);
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function checkAgendaAndSendEmail() {
  try {
    const agenda = await Agenda.findOne();
    const {
      overdue_todos,
      todays_birthdays,
      due_todos_today,
      today_special_events,
      today_appointments,
      when_to_send,
      isActive,
    } = agenda;

    const allAgendas = {};
    const todayString = new Date().toISOString().split("T")[0];

    if (isActive && when_to_send === "everyday") {
      if (overdue_todos) {
        const date = new Date();
        const todos = await Todo.find({
          dueDate: { $lt: date },
          isCompleted: false,
        });
        allAgendas.overdue_todos = todos.length === 0 ? null : todos;
      }

      if (todays_birthdays) {
        const birthdays = await Contact.aggregate([
          {
            $addFields: {
              dobDate: {
                $dateToString: { format: "%Y-%m-%d", date: "$dob" },
              },
            },
          },
          {
            $match: {
              dobDate: todayString,
            },
          },
        ]);

        allAgendas.todayBirthdays = birthdays.length === 0 ? null : birthdays;
      }

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
          // isCompleted
        ]);
        allAgendas.dueTodosToday = todos.length === 0 ? null : todos;
      }

      if (today_special_events) {
        const specialEvents = await SpecialEvent.aggregate([
          {
            $addFields: {
              todayDate: {
                $dateToString: { format: "%Y-%m-%d", date: "$date" },
              },
            },
          },
          {
            $match: {
              todayDate: todayString,
            },
          },
        ]);
        allAgendas.todaySpecialEvents =
          specialEvents.length === 0 ? null : specialEvents;
      }

      if (today_appointments) {
        const todayAppointments = await Appointment.aggregate([
          {
            $addFields: {
              todayDate: {
                $dateToString: { format: "%Y-%m-%d", date: "$date" },
              },
            },
          },
          {
            $match: {
              todayDate: todayString,
            },
          },
        ]);
        allAgendas.todayAppointments =
          todayAppointments.length === 0 ? null : todayAppointments;
      }
      await sendAgendaEmail(allAgendas);
      // console.log(allAgendas);
    } else if (isActive && when_to_send === "weekday") {
      const day = new Date();
      const weekday = day.getDay();

      if (weekday >= 1 && weekday <= 5) {
        if (overdue_todos) {
          const date = new Date();
          const todos = await Todo.find({
            dueDate: { $lt: date },
            isCompleted: false,
          });
          allAgendas.overdue_todos = todos.length === 0 ? null : todos;
        }

        if (todays_birthdays) {
          const birthdays = await Contact.aggregate([
            {
              $addFields: {
                dobDate: {
                  $dateToString: { format: "%Y-%m-%d", date: "$dob" },
                },
              },
            },
            {
              $match: {
                dobDate: todayString,
              },
            },
          ]);

          allAgendas.todayBirthdays = birthdays.length === 0 ? null : birthdays;
        }

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
                isCompleted: false,
              },
            },
          ]);
          allAgendas.dueTodosToday = todos.length === 0 ? null : todos;
        }

        if (today_special_events) {
          const specialEvents = await SpecialEvent.aggregate([
            {
              $addFields: {
                todayDate: {
                  $dateToString: { format: "%Y-%m-%d", date: "$date" },
                },
              },
            },
            {
              $match: {
                todayDate: todayString,
              },
            },
          ]);
          allAgendas.todaySpecialEvents =
            specialEvents.length === 0 ? null : specialEvents;
        }

        if (today_appointments) {
          const todayAppointments = await Appointment.aggregate([
            {
              $addFields: {
                todayDate: {
                  $dateToString: { format: "%Y-%m-%d", date: "$date" },
                },
              },
            },
            {
              $match: {
                todayDate: todayString,
              },
            },
          ]);
          allAgendas.todayAppointments =
            todayAppointments.length === 0 ? null : todayAppointments;
        }
        // console.log("weekday");
        await sendAgendaEmail(allAgendas);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

// Run every minute
const job = new CronJob(
  "*/10 * * * * *",
  () => {
    // checkAgendaAndSendEmail();
  },
  null,
  true,
  "Asia/Kolkata"
);
job.start();

module.exports = { job };
