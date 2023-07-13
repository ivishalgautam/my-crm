const { default: mongoose } = require("mongoose");

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
    // type: [{ type: mongoose.Schema.Types.ObjectId, ref: "DealType" }],
    type: { type: String },
    stage: { type: String },
    amount: { type: String, default: "" },
    commision: { type: String, default: "" },
    nextStep: { type: String, default: "" },
    probability: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "won", "lost", "back burner"],
      default: "active",
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

module.exports = {
  DealType,
  DealStage,
  Deal,
};
