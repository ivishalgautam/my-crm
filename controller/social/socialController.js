const Contact = require("../../model/Contact");
const Social = require("../../model/Social");

// create a social link
async function addSocial(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found!" });

    const social = new Social(req.body);
    await social.save();

    await Contact.findByIdAndUpdate(req.params.id, {
      $push: { socials: social._id },
    });

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update a social link
async function updateSocial(req, res) {
  try {
    const social = await Social.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!social)
      return res.status(404).json({ error: "Social link not found!" });

    res.json(social);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// delete a social link
async function deleteSocial(req, res) {
  try {
    const social = await Social.findByIdAndRemove(req.params.id);
    if (!social)
      return res.status(404).json({ error: "Social link not found!" });

    res.json("link deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get a social link
async function getSocial(req, res) {
  try {
    const social = await Social.findById(req.params.id);

    if (!social)
      return res.status(404).json({ error: "Social link not found!" });

    res.json(social);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get all social links
async function getSocials(req, res) {
  try {
    const socials = await Social.find();
    if (socials.length <= 0)
      return res.json("We do not have socials for this contact!");

    res.json(socials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addSocial,
  updateSocial,
  deleteSocial,
  getSocial,
  getSocials,
};
