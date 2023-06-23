const { default: mongoose } = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    recurs: {
      type: String,
      enum: [
        "Only_Once",
        "Every_Day",
        "Every_Weekday",
        "Weekly",
        "Every_Other_Week",
        "Monthly",
        "Yearly",
      ],
      default: "Only_Once",
    },
    occurences: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      default: "1",
    },
    details: {
      type: String,
    },
    contact: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    deal: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DealType",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
