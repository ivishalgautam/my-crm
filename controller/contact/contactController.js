const Appointment = require("../../model/Appointment");
const Contact = require("../../model/Contact");
const Note = require("../../model/Note");
const Todo = require("../../model/Todo");

// creates contact
async function createContact(req, res) {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// updates contact
async function updateContact(req, res) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedContact)
      return res.status(404).json({ error: "contact not found!" });
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// deletes contact
async function deleteContact(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "contact not found!" });

    await Appointment.deleteMany({ _id: { $in: contact.appointments } }); // deletes all the appointments related to this contact
    await Note.deleteMany({ _id: { $in: contact.notes } }); // deletes all the notes related to this contact
    await Todo.deleteMany({ _id: { $in: contact.todos } }); // deletes all the todos related to this contact
    await Contact.findByIdAndRemove(req.params.id);

    res.json("contact deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all contacts
async function getContacts(req, res) {
  try {
    const contacts = await Contact.find().populate([
      "notes",
      "todos",
      "appointments",
      "referredBy",
      "source",
      "category",
      "referral",
      "tags",
    ]);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get a contact
async function getContact(req, res) {
  try {
    const contact = await Contact.findById(req.params.id).populate([
      "notes",
      "todos",
      "appointments",
      "referredBy",
      "source",
      "category",
      "referral",
      "tags",
    ]);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createContact,
  updateContact,
  deleteContact,
  getContacts,
  getContact,
};
