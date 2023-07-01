const { default: mongoose } = require("mongoose");

const TextFieldSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  type: { type: String, default: "text" },
});
const DropdownSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  values: { type: Array },
  type: { type: String, default: "dropdown" },
});
const TextAreaSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  type: { type: String, default: "textarea" },
});
const CheckboxSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  type: { type: String, default: "checkbox" },
});
const DateFieldSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  type: { type: String, default: "date" },
});
const NumberFieldSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  type: { type: String, default: "number" },
});
const CurrencyFieldSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  type: { type: String, default: "currency" },
});
const InterestFieldSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  type: { type: String, default: "interestRate" },
});

const DealTextField = mongoose.model("DealTextField", TextFieldSchema);
const DealDropdown = mongoose.model("DealDropdown", DropdownSchema);
const DealTextArea = mongoose.model("DealTextArea", TextAreaSchema);
const DealCheckbox = mongoose.model("DealCheckbox", CheckboxSchema);
const DealDateField = mongoose.model("DealDateField", DateFieldSchema);
const DealNumberField = mongoose.model("DealNumberField", NumberFieldSchema);
const DealCurrencyField = mongoose.model(
  "DealCurrencyField",
  CurrencyFieldSchema
);
const DealInterest = mongoose.model("DealInterest", InterestFieldSchema);

module.exports = {
  DealTextField,
  DealDropdown,
  DealTextArea,
  DealCheckbox,
  DealDateField,
  DealNumberField,
  DealCurrencyField,
  DealInterest,
};
