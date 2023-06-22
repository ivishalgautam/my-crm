const { default: mongoose } = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});
