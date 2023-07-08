const Appointment = require("../../model/Appointment");
const CronJob = require("cron").CronJob;
const nodemailer = require("nodemailer");

async function sendEmail() {
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
      text: "testing the email for crm",
    };
    await transporter.sendMail(mailOption);
    console.log("email sent");
  } catch (error) {
    console.log(error.message);
  }
}

async function checkAppointmentAndSendEmails() {
  const appointments = await Appointment.find();
  // console.log(appointments[0].date.toDateString());
  appointments.forEach((appointment) => {
    const { recurs, occurrences } = appointment;

    let cronInterval;
    switch (recurs) {
      case "only once":
        cronInterval = `* * * * *`; // Runs once at any minute of any hour, any day
        break;
      case "every day":
        cronInterval = `*/${Math.floor(24 / Number(occurrences))} * * * *`;
        break;
      case "every weekday":
        cronInterval = "0 0 * * 1-5"; // Runs every day (Monday to Friday) at midnight
        break;
      case "weekly":
        cronInterval = `0 0 * * ${Math.floor(7 / Number(occurrences))}`; // Runs every week on the specified day (0-6 represents Sunday to Saturday) at midnight
        break;
      case "monthly":
        cronInterval = `0 0 ${Math.floor(28 / Number(occurrences))} * *`; // Runs every month on the specified day at midnight
        break;
      case "yearly":
        cronInterval = `0 0 ${Number(occurrences)[2]} ${
          Number(occurrences)[1]
        } *`; // Runs every year on the specified day and month at midnight
        break;
    }
    const job = new CronJob(
      cronInterval,
      () => {
        if (appointment.occurrences > 0) {
          sendEmail();
          console.log(appointment.occurrences);
          appointment.occurrences -= appointment.occurrences;
          // appointment.occurrences--;
        }
      },
      null,
      true,
      "UTC"
    );
  });
}
// checkAppointmentAndSendEmails();

// Run every minute
// const job = new CronJob(
//   "* * * * *",
//   () => {
//     checkAppointmentAndSendEmails();
//   },
//   null,
//   true,
//   "Asia/Kolkata"
// );
// job.start();

// module.exports = { job };
