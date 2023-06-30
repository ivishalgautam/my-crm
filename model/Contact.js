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
    appointments: [
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
    deals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deal" }],
    customCheckBoxes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CheckBox" },
    ],
    customDropdowns: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Dropdown" },
    ],
    customInputs: [{ type: mongoose.Schema.Types.ObjectId, ref: "TextInput" }],
  },
  { timestamps: true }
);

// Function to dynamically add custom fields to the schema
// function addCustomFields(fields) {
//   const customFieldsSchema = {};
//   for (const fieldName in fields) {
//     customFieldsSchema[fieldName] = {
//       type: mongoose.Schema.Types.Mixed,
//     };
//   }
//   ContactSchema.add(customFieldsSchema);
// }

// Example usage
// const dynamicFields = {
//   field1: "Some value",
//   field2: 123,
//   field3: true,
// };

// addCustomFields(dynamicFields);

module.exports = mongoose.model("Contact", ContactSchema);
