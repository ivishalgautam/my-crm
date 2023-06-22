const Appointment = require("../../model/Appointment");
const Contact = require("../../model/Contact");

// create appointment
async function createAppointment() {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found!" });

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

    contact.appointment.push(newAppointment._id);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update appointment
async function updateAppointment() {
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
async function deleteAppointment() {
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
async function getAppointments() {
  try {
    const appointments = await Appointment.find();
    if (appointment.length <= 0)
      return res.status(404).json({ error: "There are no appointments" });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get appointment
async function getAppointment() {
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
