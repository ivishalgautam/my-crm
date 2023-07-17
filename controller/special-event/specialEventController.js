const Contact = require("../../model/Contact");
const SpecialEvent = require("../../model/SpecialEvent");

// creates a new special event
async function addSpecialEvent(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not exist" });

    const specialEvent = new SpecialEvent(req.body);
    await specialEvent.save();

    await Contact.findByIdAndUpdate(req.params.id, {
      $push: { specialEvents: specialEvent._id },
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// update a special event
async function updateSpecialEvent(req, res) {
  try {
    const specialEvent = await SpecialEvent.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!specialEvent)
      return res.status(404).json({ error: "Event not found!" });
    res.json(specialEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// deletes a special event
async function deleteSpecialEvent(req, res) {
  try {
    const specialEvent = await SpecialEvent.findByIdAndRemove(req.params.id);
    if (!specialEvent)
      return res.status(404).json({ error: "Event not found!" });
    res.json("event deleted succesdfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get a special event
async function getSpecialEvent(req, res) {
  try {
    const specialEvent = await SpecialEvent.findById(req.params.id);
    if (!specialEvent)
      return res.status(404).json({ error: "Event not found!" });
    res.json(specialEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get all special event
async function getSpecialEvents(req, res) {
  try {
    const specialEvents = await SpecialEvent.find();
    if (specialEvents.length <= 0)
      return res.json({ message: "No events found!" });
    res.json(specialEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addSpecialEvent,
  updateSpecialEvent,
  deleteSpecialEvent,
  getSpecialEvent,
  getSpecialEvents,
};
