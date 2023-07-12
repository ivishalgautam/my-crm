const FollowUp = require("../../model/FollowUp");

// create follow up
async function createFollowUp(req, res) {
  try {
    const followUp = new FollowUp(req.body);
    await followUp.save();
    res.json(followUp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update follow up
async function updateFollowUp(req, res) {
  try {
    const followUp = await FollowUp.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!followUp) res.status(404).json({ error: "follow up not found!" });
    res.json(followUp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete follow up
async function deleteFollowUp(req, res) {
  try {
    const followUp = await FollowUp.findByIdAndDelete(req.params.id);
    if (!followUp) res.status(404).json({ error: "follow up not found!" });
    res.json("follow up deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get a follow up
async function getFollowUp(req, res) {
  try {
    const followUp = await FollowUp.findById(req.params.id);
    if (!followUp) res.status(404).json({ error: "follow up not found!" });
    res.json(followUp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all follow ups
async function getFollowUps(req, res) {
  try {
    const followUps = await FollowUp.find();
    if (followUps.length <= 0) res.json({ error: "there are no follow ups" });
    res.json(followUps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createFollowUp,
  updateFollowUp,
  deleteFollowUp,
  getFollowUp,
  getFollowUps,
};
