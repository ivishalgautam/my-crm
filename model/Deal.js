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
});

const DealStageSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const DealSchema = new mongoose.Schema(
  {
    name: { type: String },
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "DealType" }],
    amount: { type: String },
    commision: { type: String },
    nextStep: { type: String },
    probability: { type: String },
    status: {
      type: String,
      enum: ["Active", "Won", "Lost", "Back Burner"],
      default: "Active",
    },
    isShowOnDeals: { type: Boolean, default: true },
    expectedClose: { type: Date },
    actualClose: { type: Date },
    wonLostReason: { type: String },
  },
  { timestamps: true }
);

const DealType = mongoose.model("DealType", DealTypeSchema);
const DealStage = mongoose.model("DealStage", DealStageSchema);
const Deal = mongoose.model("Deal", DealSchema);

module.exports = { DealType, DealStage, Deal };
