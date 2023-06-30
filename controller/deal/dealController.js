const Contact = require("../../model/Contact");
const { Deal, DealStage, DealType } = require("../../model/Deal");

// ----------------- deals controlers -----------------
// add a deal
async function createDeal(req, res) {
  try {
    const newDeal = new Deal(req.body);
    await newDeal.save();
    console.log(newDeal);
    res.json(newDeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// add a deal
async function createContactDeal(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).json({ error: "Contact not found!" });

    const deal = new Deal(req.body);
    await deal.save();
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {
      $push: { deals: deal._id },
    });
    if (!updatedContact) {
      await Deal.findByIdAndRemove(deal._id);
    }
    res.json(updatedContact);
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
    const deal = await Deal.findById(req.params.id).populate({
      path: "type",
      populate: {
        path: "stage",
        model: "DealStage",
      },
    });
    if (!deal) return res.status(404).json({ error: "Deal not found!" });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get all deals
async function getDeals(req, res) {
  try {
    const deals = await Deal.find({}).populate({
      path: "type",
      model: "DealType",
      populate: [
        { path: "stage", model: "DealStage" },
        {
          path: "inputFields.textFields",
          model: "DealTextField",
        },
        {
          path: "inputFields.dropdownLists",
          model: "DealDropdown",
        },
        {
          path: "inputFields.noteFields",
          model: "DealTextArea",
        },
        {
          path: "inputFields.checkboxes",
          model: "DealCheckbox",
        },
        {
          path: "inputFields.noteFields",
          model: "DealTextArea",
        },
        {
          path: "inputFields.checkboxes",
          model: "DealCheckbox",
        },
        {
          path: "inputFields.dateFields",
          model: "DealDateField",
        },
        {
          path: "inputFields.numberFields",
          model: "DealNumberField",
        },
        {
          path: "inputFields.currencyFields",
          model: "DealCurrencyField",
        },
        {
          path: "inputFields.interestRateFields",
          model: "DealInterest",
        },
      ],
    });
    if (deals.length <= 0)
      return res.status(404).json({ error: "There are no deals!" });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ----------- deal type controllers ---------------
// use these endpoints only while creating deal types

// create deal type
async function createDealType(req, res) {
  try {
    const newDealStage = new DealType(req.body);
    await newDealStage.save();
    res.json(newDealStage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// update deal type
async function updateDealType(req, res) {
  console.log(req.body.dropdownLists);
  try {
    const updatedDealType = await DealType.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedDealType)
      return res.status(404).json({ error: "Deal type not found!" });
    res.json(updatedDealType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete deal type
async function deleteDealType(req, res) {
  try {
    const dealType = await DealType.findByIdAndDelete(req.params.id);
    if (!dealType)
      return res.status(404).json({ error: "Deal type not found!" });
    res.json("deal type deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get one deal type
async function getDealType(req, res) {
  try {
    const deal = await DealType.findById(req.params.id).populate("stage");
    if (!deal) return res.status(404).json({ error: "Deal type not found!" });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get all deal types
async function getDealTypes(req, res) {
  try {
    const deals = await DealType.find().populate([
      { path: "stage", model: "DealStage" },
      {
        path: "inputFields.textFields", //incomplete
        model: "DealTextField",
      },
    ]);
    if (!deals)
      return res.status(404).json({ error: "There are no deal types found!" });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ----------- deal stage controllers ---------------
// create deal stage
// create deal stage in stage type
async function addDealStage(req, res) {
  try {
    const dealType = await DealType.findById(req.params.id);
    if (!dealType)
      return res.status(404).json({ error: "Deal type not found!" });

    const dealStage = new DealStage(req.body);
    await dealStage.save();

    dealType.stage.push(dealStage._id);
    await dealType.save();

    res.json(dealType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// update deal stage
async function updateDealStage(req, res) {
  try {
    const updatedDeal = await DealStage.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $addToSet: { type: req.body.type } },
      { new: true }
    );
    if (!updatedDeal) return res.status(404).json({ error: "Deal not found!" });
    res.json(updatedDeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// delate deal stage
async function deleteDealStage(req, res) {
  try {
    const deal = await DealStage.findByIdAndDelete(req.params.id);
    if (!deal) return res.status(404).json({ error: "Deal not found!" });
    res.json("deal stage deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get one deal stage
async function getDealStage(req, res) {
  try {
    const deal = await DealStage.findById(req.params.id);
    if (!deal) return res.status(404).json({ error: "Deal not found!" });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get all deal stages
async function getDealStages(req, res) {
  try {
    const deals = await DealStage.find();
    if (!deals)
      return res.status(404).json({ error: "There are no deals found!" });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createDeal,
  createContactDeal,
  updateDeal,
  deleteDeal,
  getDeal,
  getDeals,
  createDealType,
  addDealStage,
  updateDealType,
  deleteDealType,
  getDealType,
  getDealTypes,
  updateDealStage,
  deleteDealStage,
  getDealStage,
  getDealStages,
};
