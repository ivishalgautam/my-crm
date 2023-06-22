const { Deal } = require("../../model/Deal");

// add a deal
async function createDeal(req, res) {
  try {
    const newDeal = new Deal(req.body);
    await newDeal.save();
    res.json(newDeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update a deal
async function updateDeal(req, res) {
  try {
    const updatedDeal = await Deal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedDeal) return res.status(404).json({ error: "Deal not found!" });
    res.json(updatedDeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete a deal
async function deleteDeal(req, res) {
  try {
    const deletedDeal = await Deal.findByIdAndDelete(req.params.id);
    if (!deletedDeal) return res.status(404).json({ error: "Deal not found!" });
    res.json("deal deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get a deal
async function getDeal(req, res) {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) return res.status(404).json({ error: "Deal not found!" });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all deals
async function getDeals(req, res) {
  try {
    const deals = await Deal.find();
    if (deals.length <= 0)
      return res.status(404).json({ error: "There are no deals!" });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createDeal, updateDeal, deleteDeal, getDeal, getDeals };
