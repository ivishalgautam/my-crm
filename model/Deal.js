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

const DealTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stage: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DealStage",
      required: true,
    },
  ],
  dealFeatures: {
    notes: { type: Boolean, default: false },
    appointments: { type: Boolean, default: false },
    attachments: { type: Boolean, default: false },
    relatedContacts: { type: Boolean, default: false },
  },
  hiddenFields: {
    probability: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    amount: { type: Boolean, default: false },
    commission: { type: Boolean, default: false },
    expectedCloseDate: { type: Boolean, default: false },
    actualCloseDate: { type: Boolean, default: false },
    nextStep: { type: Boolean, default: false },
    wonLostReason: { type: Boolean, default: false },
  },
  inputFields: {
    textFields: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DealTextField" },
    ],
    dropdownLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DealDropdown",
      },
    ],
    noteFields: [{ type: mongoose.Schema.Types.ObjectId, ref: "DealTextArea" }],
    checkboxes: [{ type: mongoose.Schema.Types.ObjectId, ref: "DealCheckbox" }],
    dateFields: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DealDateField" },
    ],
    numberFields: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DealNumberField" },
    ],
    currencyFields: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DealCurrencyField" },
    ],
    interestRateFields: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DealInterest" },
    ],
  },
});

const DealStageSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const DealSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "DealType" }],
    amount: { type: String, default: "" },
    commision: { type: String, default: "" },
    nextStep: { type: String, default: "" },
    probability: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Active", "Won", "Lost", "Back Burner"],
      default: "Active",
    },
    isShowOnDeals: { type: Boolean, default: true },
    expectedCloseDate: { type: Date, default: "" },
    actualCloseDate: { type: Date, default: "" },
    wonLostReason: { type: String, default: "" },
  },
  { timestamps: true }
);

const DealType = mongoose.model("DealType", DealTypeSchema);
const DealStage = mongoose.model("DealStage", DealStageSchema);
const Deal = mongoose.model("Deal", DealSchema);

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
  DealType,
  DealStage,
  Deal,
  DealTextField,
  DealDropdown,
  DealTextArea,
  DealCheckbox,
  DealDateField,
  DealNumberField,
  DealCurrencyField,
  DealInterest,
};
