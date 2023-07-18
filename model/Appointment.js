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
        "only once",
        "everyday",
        "every weekday",
        "weekly",
        "every other week",
        "monthly",
        "yearly",
      ],
      default: "only once",
    },
    occurrences: {
      type: String,
      default: "1",
    },
    details: {
      type: String,
    },
    with: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // deal: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
