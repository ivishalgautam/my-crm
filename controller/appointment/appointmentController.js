const Appointment = require("../../model/Appointment");
const Contact = require("../../model/Contact");

// create appointment
async function createAppointment(req, res) {
  try {
    // calculate the time with extra 30 minutes
    const startTime = new Date(req.body.date);
    const endTime = new Date(req.body.date);
    startTime.setMinutes(startTime.getMinutes() - 15);
    endTime.setMinutes(endTime.getMinutes() + 15);
    // check if appointment with this time or for next 30 minutes exist
    const existingAppointment = await Appointment.findOne({
      date: { $gte: startTime, $lte: endTime },
    });
    // console.log(startTime.toLocaleTimeString(), endTime.toLocaleTimeString());
    if (existingAppointment)
      return res
        .status(400)
        .json({ error: "Book appointment with different time!" });
    const appointment = new Appointment(req.body); // new appointment
    await appointment.save();

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { appointments: appointment._id },
      },
      { new: true }
    ); // find contact by id and update

    if (!contact) {
      await Appointment.findByIdAndDelete(appointment._id);
      return res.status(404).json({ error: "Contact not found!" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update appointment
async function updateAppointment(req, res) {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedAppointment)
      return res.status(404).json({ error: "appointment not found!" });

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete appointment
async function deleteAppointment(req, res) {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment)
      return res.status(404).json({ error: "appointment not found!" });

    res.json("appointment deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all appointments
async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.find().populate(["contact", "deal"]);
    if (appointments.length <= 0) return res.json("We have no appointments!");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get appointment
async function getAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id).populate([
      "contact",
      "deal",
    ]);

    if (!appointment)
      return res.status(404).json({ error: "appointment not found!" });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointments,
  getAppointment,
};
