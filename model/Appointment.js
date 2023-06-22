const { default: mongoose } = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    recurs: {
      type: String,
      enum: [
        "Only_Once",
        "Every_Day",
        "Every_Weekday",
        "Weekly",
        "Every_Other_week",
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
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
