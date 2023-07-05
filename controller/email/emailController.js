const Appointment = require("../../model/Appointment");
const CronJob = require("cron").CronJob;

async function checkAppointmentAndSendEmails(req, res) {
  const appointments = await Appointment.find();
  // console.log(appointments[0].date.toDateString());
  appointments.forEach((appointment) => {
    // const job = new CronJob("");
  });
}

// Run every minute
const job = new CronJob(
  "* * * * *",
  () => {
    checkAppointmentAndSendEmails();
  },
  null,
  true,
  "Asia/Kolkata"
);
job.start();

module.exports = { job };
