const { default: mongoose } = require("mongoose");

const FollowUpSchema = new mongoose.schema({
  by: {
    type: String,
    required: true,
  },
  comment: {
    type: string,
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
