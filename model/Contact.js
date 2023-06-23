const { default: mongoose } = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    firstname: {
      primary: {
        type: String,
        required: true,
      },
      other: {
        type: String,
      },
    },
    lastname: {
      primary: {
        type: String,
        required: true,
      },
      other: {
        type: String,
      },
    },
    email: {
      primary: {
        type: String,
        required: true,
      },
      other: {
        type: String,
      },
    },
    dob: {
      type: Date,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    address: {
      stAddress: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: true,
      },
    },
    phoneNumbers: [
      {
        type: String,
        required: true,
      },
    ],
    briefNote: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
    appointment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    referredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    source: [{ type: mongoose.Schema.Types.ObjectId, ref: "Source" }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    referral: [{ type: mongoose.Schema.Types.ObjectId, ref: "Referral" }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
