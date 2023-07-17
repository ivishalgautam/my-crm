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
        number: {
          type: String,
          required: true,
        },
        note: {
          type: String,
          required: true,
        },
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
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    attachments: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    specialEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    socials: [{ type: mongoose.Schema.Types.ObjectId, ref: "Social" }],
    referredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
    source: [{ type: mongoose.Schema.Types.ObjectId, ref: "Source" }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    referral: [{ type: mongoose.Schema.Types.ObjectId, ref: "Referral" }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    deals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deal" }],
    customCheckBoxes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CheckBox" },
    ],
    customDropdowns: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Dropdown" },
    ],
    customInputs: [{ type: mongoose.Schema.Types.ObjectId, ref: "TextInput" }],
    followUps: [{ type: mongoose.Schema.Types.ObjectId, ref: "FollowUp" }],
    status: {
      type: String,
      enum: ["pending", "confirmed", "closed", "not interested"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
