const Appointment = require("../../model/Appointment");

async function checkAppointment(req, res) {
  const appointments = await Appointment.find();
  console.log(appointments);
}
