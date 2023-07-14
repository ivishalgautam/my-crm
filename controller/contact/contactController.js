const Appointment = require("../../model/Appointment");
const Contact = require("../../model/Contact");
const { Deal } = require("../../model/Deal");
const Note = require("../../model/Note");
const Todo = require("../../model/todo/Todo");

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
    await Deal.deleteMany({ _id: { $in: contact.deals } }); // deletes all the deals related to this contact
    await Contact.findByIdAndRemove(req.params.id);

    res.json("contact deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// deleted all contacts
async function deleteAllContacts(req, res) {
  try {
    const contacts = await Contact.find({});
    await Contact.deleteMany({ _id: { $in: contacts._id } });
    res.json("contacts deleted");
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
      "socials",
      "referredBy",
      "source",
      "category",
      "referral",
      "tags",
      "deals",
      {
        path: "followUps",
        model: "FollowUp",
        populate: {
          path: "by",
          model: "User",
          select: "name isAdmin",
        },
      },
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
      { path: "attachments", model: "Attachment" },
      "socials",
      "referredBy",
      "source",
      "category",
      "referral",
      "tags",
      "deals",
      {
        path: "followUps",
        model: "FollowUp",
        populate: {
          path: "by",
          model: "User",
          select: "name isAdmin",
        },
      },
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
  deleteAllContacts,
};
