const { default: mongoose } = require("mongoose");

const CheckBoxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: { type: String, default: "checkbox" },
});
const DropdownSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: { type: String, default: "dropdown" },
  options: [
    {
      type: String,
      required: true,
    },
  ],
});
const InputSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: "text" },
});

const CheckBox = mongoose.model("CheckBox", CheckBoxSchema);
const Dropdown = mongoose.model("Dropdown", DropdownSchema);
const TextInput = mongoose.model("TextInput", InputSchema);

module.exports = { CheckBox, Dropdown, TextInput };
