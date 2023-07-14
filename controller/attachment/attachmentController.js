const path = require("path");
const fs = require("fs");
const Attachment = require("../../model/Attachment");
const Contact = require("../../model/Contact");

const currentRootDirectoryName = path.basename(process.cwd());

// upload file
async function createAttachment(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "contact not exist!" });
    // console.log(req.files);
    const files = req.files.map((file) => ({
      name: file.originalname,
      path: `uploads/${file.filename}`,
    }));
    const attachments = await Attachment.insertMany(files);
    const ids = attachments.map((attachment) => attachment._id);
    contact.attachments.push(...ids);
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete file
async function deleteAttachment(req, res) {
  try {
    const attachment = await Attachment.findById(req.params.id);
    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    fs.unlinkSync(attachment.path);
    await attachment.deleteOne();

    res.json({ message: "attachment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all attachments
async function getAttachments(req, res) {
  try {
    const attachments = await Attachment.find();
    if (!attachments) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    res.json(attachments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createAttachment, deleteAttachment, getAttachments };
