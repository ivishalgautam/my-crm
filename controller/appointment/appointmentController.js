const Appointment = require("../../model/Appointment");
const Contact = require("../../model/Contact");

/**
 * The function calculates the next date based on a given start date, recurrence pattern, and index.
 * @param startDate - The `startDate` parameter is the starting date from which the calculation of the
 * next date will begin. It should be a valid date string or a `Date` object.
 * @param recurs - The `recurs` parameter is a string that represents the recurrence pattern. It can
 * have the following values:
 * @param index - The `index` parameter represents the number of times the recurring event has
 * occurred. It is used to calculate the next date based on the recurrence pattern specified in the
 * `recurs` parameter.
 * @returns the calculated next date based on the given start date, recurrence type, and index.
 */
function calculateNextDate(startDate, recurs, index) {
  // console.log(startDate, recurs, index);
  const date = new Date(startDate);
  switch (recurs) {
    case "everyday":
      date.setDate(date.getDate() + index);
      break;
    case "every weekday":
      date.setDate(date.getDate() + index);
      if (date.getDay() === 0 || date.getDay() === 6) {
        // Skip weekends
        date.setDate(date.getDate() + 1);
      }
      break;
    case "weekly":
      date.setDate(date.getDate() + index * 7);
      break;
    case "every other week":
      date.setDate(date.getDate() + index * 14);
      break;
    case "monthly":
      date.setMonth(date.getMonth() + index);
      break;
    case "yearly":
      date.setFullYear(date.getFullYear() + index);
      break;
    default:
      break;
  }
  // console.log(date);
  return date;
}

// create appointment
async function createAppointment(req, res) {
  // console.log(req.body.occurrences);
  try {
    // calculate the time with extra 30 minutes
    const startTime = new Date(req.body.date);
    const endTime = new Date(req.body.date);
    startTime.setMinutes(startTime.getMinutes() - 15);
    endTime.setMinutes(endTime.getMinutes() + 15);

    // check if appointment with this time or before and after 15 minutes exist
    const existingAppointment = await Appointment.findOne({
      date: { $gte: startTime, $lte: endTime },
    });

    if (existingAppointment)
      return res
        .status(400)
        .json({ error: "Book appointment with different time!" });

    let numOccurrences = parseInt(req.body.occurrences);
    if (req.body.recurs !== "only once" && numOccurrences > 1) {
      for (let i = 0; i < numOccurrences - 1; i++) {
        const newAppointmentData = {
          ...req.body,
          date: calculateNextDate(req.body.date, req.body.recurs, i + 1),
        };
        await Appointment.create(newAppointmentData);
      }
      // return res.json("appointments created");
    }

    const appointment = new Appointment(req.body); // new appointment
    appointment.occurrences = "1";
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

// delete all
async function deleteAllAppointments(req, res) {
  try {
    const appointments = await Appointment.deleteMany({});
    if (!appointments) return res.json("something wrong happened");
    res.json("all appointments deleted!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all appointments
async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.find();
    if (appointments.length <= 0)
      return res.json({ message: "We have no appointments!" });

    // res.json(appointments.map((appointment) => appointment.date));
    const modifiedAppointments = appointments.map((appointment) => {
      const { recurs, occurrences, ...rest } = appointment._doc;
      return rest;
    });
    res.json(modifiedAppointments);
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
  deleteAllAppointments,
  getAppointments,
  getAppointment,
};
