require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const contactRoutes = require("./router/contact");
const noteRoutes = require("./router/note");
const todoRoutes = require("./router/todo");
const appointmentRoutes = require("./router/appointment");
const dealRoutes = require("./router/deal");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("connected with database"));

app.use("/api/contacts", contactRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/deals", dealRoutes);

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
