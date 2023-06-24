const Appointment = require("../../model/Appointment");
const Contact = require("../../model/Contact");

// create appointment
async function createAppointment(req, res) {
  try {
    const contact = await Contact.findById(req.params.id); // find contact by id
    if (!contact) return res.status(404).json({ error: "Contact not found!" });

    const appointment = new Appointment(req.body); // new appointment
    await appointment.save();

    contact.appointment.push(appointment._id);
    await contact.save();
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
      { new: true }
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
    const appointments = await Appointment.find();
    if (appointments.length <= 0)
      return res.status(404).json({ error: "We have no appointments!" });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get appointment
async function getAppointment(req, res) {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

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
