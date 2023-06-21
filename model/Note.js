const { default: mongoose } = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
