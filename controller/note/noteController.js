const Contact = require("../../model/Contact");
const Note = require("../../model/Note");

// add note
async function addNote(req, res) {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// add note of a contact
async function addNoteToContact(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "contact not found!" });

    const newNote = new Note(req.body);
    await newNote.save();

    await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { notes: newNote._id },
      },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update note
async function updateNote(req, res) {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ error: "Note not found!" });

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete note
async function deleteNote(req, res) {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found!" });
    res.json("Note deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get a note
async function getNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found!" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all note
async function getNotes(req, res) {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addNote,
  updateNote,
  deleteNote,
  getNote,
  getNotes,
  addNoteToContact,
};
