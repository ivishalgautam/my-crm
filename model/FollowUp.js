const { default: mongoose } = require("mongoose");

const FollowUpSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "closed", "not interested"],
  },
});

module.exports = mongoose.model("FollowUp", FollowUpSchema);
