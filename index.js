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
const dealRoutes = require("./router/deal/deal");
const dealTypeRoutes = require("./router/deal/dealType");
const dealStageRoutes = require("./router/deal/dealStage");
const customInputs = require("./router/customInputs");
const contactData = require("./router/data");
const connectDB = require("./database/db");
const morgan = require("morgan");

app.use(express.json());
app.use(cors());
connectDB();
app.use(morgan("tiny"));

app.use("/api/contacts", contactRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/deal-types", dealTypeRoutes);
app.use("/api/deal-stages", dealStageRoutes);
app.use("/api/custom-inputs", customInputs);
app.use("/api/contact-data", contactData);

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
