const {
  DealType,
  DealTextField,
  DealDropdown,
  DealTextArea,
  DealCheckbox,
  DealDateField,
  DealNumberField,
  DealCurrencyField,
  DealInterest,
} = require("../../model/Deal");

// add deal input
async function addDealFields(req, res) {
  const { type } = req.query;
  if (!type) return res.status(400).json({ error: "Please pass some query" });
  try {
    const dealType = await DealType.findById(req.params.id);
    if (!dealType)
      return res.status(404).json({ error: "Deal type not found!" });
    let field;
    let fieldKey;
    switch (type) {
      case "textFields":
        if (!req.body.textFields)
          return res.status(400).json({ error: "Missing 'textFields' data" });
        field = new DealTextField(req.body.textFields);
        fieldKey = "textFields";
        break;
      case "dropdownLists":
        if (!req.body.dropdownLists)
          return res
            .status(400)
            .json({ error: "Missing 'dropdownLists' data" });
        field = new DealDropdown(req.body.dropdownLists);
        fieldKey = "dropdownLists";
        break;
      case "noteFields":
        if (!req.body.noteFields)
          return res.status(400).json({ error: "Missing 'noteFields' data" });
        field = new DealTextArea(req.body.notes);
        fieldKey = "noteFields";
        break;
      case "checkboxes":
        if (!req.body.checkboxes)
          return res.status(400).json({ error: "Missing 'checkboxes' data" });
        field = new DealCheckbox(req.body.checkboxes);
        fieldKey = "checkboxes";
        break;
      case "dateFields":
        if (!req.body.dateFields)
          return res.status(400).json({ error: "Missing 'dateFields' data" });
        field = new DealDateField(req.body.dateFields);
        fieldKey = "dateFields";
        break;
      case "numberFields":
        if (!req.body.numberFields)
          return res.status(400).json({ error: "Missing 'numberFields' data" });
        field = new DealNumberField(req.body.numberFields);
        fieldKey = "numberFields";
        break;
      case "currencyFields":
        if (!req.body.currencyFields)
          return res
            .status(400)
            .json({ error: "Missing 'currencyFields' data" });
        field = new DealCurrencyField(req.body.currencyFields);
        fieldKey = "currencyFields";
        break;
      case "interestRateFields":
        if (!req.body.interestRateFields)
          return res
            .status(400)
            .json({ error: "Missing 'interestRateFields' data" });
        field = new DealInterest(req.body.interestRateFields);
        fieldKey = "interestRateFields";
        break;

      default:
        return res
          .status(400)
          .json({ error: `Invalid 'type' value: '${type}'` });
    }
    await field.save();
    dealType.inputFields[fieldKey].push(field._id);
    const updatedDealType = await dealType.save();
    res.json(updatedDealType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addDealFields };
