const { TextInput, Dropdown, CheckBox } = require("../../model/CustomInputs");

// post input
async function createInput(req, res) {
  const { type } = req.query;
  if (!type) return res.status(409).json({ error: "Please pass some query!" });
  try {
    let input;
    switch (type) {
      case "text":
        input = new TextInput(req.body);
        break;
      case "dropdown":
        input = new Dropdown(req.body);
        break;
      case "checkbox":
        input = new CheckBox(req.body);
        break;
      default:
        return res
          .status(400)
          .json({ error: `Invalid 'type' value: '${type}'` });
    }
    await input.save();
    res.json(input);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete fields
async function deleteInput(req, res) {
  const { type } = req.query;
  if (!type) return res.status(409).json({ error: "Please pass some query!" });
  let input;
  try {
    switch (type) {
      case "text":
        input = await TextInput.findByIdAndDelete(req.params.id);
        break;
      case "dropdown":
        input = await Dropdown.findByIdAndDelete(req.params.id);
        break;
      case "checkbox":
        input = await CheckBox.findByIdAndDelete(req.params.id);
        break;
      default:
        console.log(`we dont have this ${type} type of inputs`);
        break;
    }
    if (!input) return res.status(404).json({ error: "Input not found! " });
    res.json("input deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update fields
async function updateInput(req, res) {
  const { type } = req.query;
  if (!type) return res.status(409).json({ error: "Please pass some query!" });
  try {
    switch (type) {
      case "text":
        const textInput = await TextInput.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.json(textInput);
        break;
      case "dropdown":
        const dropdown = await Dropdown.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.json(dropdown);
        break;
      case "checkbox":
        const checkbox = await CheckBox.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.json(checkbox);
        break;
      default:
        console.log(`we dont have this ${type} type of inputs`);
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get input
async function getInput(req, res) {
  const { type } = req.query;
  if (!type) return res.status(409).json({ error: "Please pass some query!" });
  try {
    switch (type) {
      case "text":
        const textInput = await TextInput.findById(req.params.id);
        if (!textInput)
          return res.status(404).json({ error: "input not found!" });
        await textInput.save();
        res.json(textInput);
        break;
      case "dropdown":
        const dropdown = await Dropdown.findById(req.params.id);
        if (!dropdown)
          return res.status(404).json({ error: "input not found!" });
        await dropdown.save();
        res.json(dropdown);
        break;
      case "checkbox":
        const checkbox = await CheckBox.findById(req.params.id);
        if (!checkbox)
          return res.status(404).json({ error: "input not found!" });
        await checkbox.save();
        res.json(checkbox);
        break;
      default:
        console.log(`we dont create this ${type} type of inputs`);
        break;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all inputs
async function getTextFields(req, res) {
  try {
    const textInputs = await TextInput.find();
    const dropdowns = await Dropdown.find();
    const checkBoxes = await CheckBox.find();
    res.json([...textInputs, ...dropdowns, ...checkBoxes]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createInput, deleteInput, getTextFields };
