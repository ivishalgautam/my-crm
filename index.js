require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const connectDB = require("./database/db");
const morgan = require("morgan");

// routes import
const contactRoutes = require("./router/contact");
const noteRoutes = require("./router/note");
const todoRoutes = require("./router/todo/todo");
const todoPlanRoutes = require("./router/todo/todoPlan");
const todoPlanStepRoute = require("./router/todo/todoPlanStep");
const appointmentRoutes = require("./router/appointment");
const socialRoutes = require("./router/social");
const specialEventRoutes = require("./router/specialEvent");
const dealRoutes = require("./router/deal/deal");
const dealTypeRoutes = require("./router/deal/dealType");
const dealStageRoutes = require("./router/deal/dealStage");
const dealFieldRoutes = require("./router/deal/dealField");
const customInputs = require("./router/customInputs");
const contactData = require("./router/data");

app.use(express.json());
app.use(cors());
connectDB();
app.use(morgan("tiny"));

app.use("/api/contacts", contactRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/todo-plans", todoPlanRoutes);
app.use("/api/todo-plan-steps", todoPlanStepRoute);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/socials", socialRoutes);
app.use("/api/special-events", specialEventRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/deal-types", dealTypeRoutes);
app.use("/api/deal-stages", dealStageRoutes);
app.use("/api/deal-fields", dealFieldRoutes);
app.use("/api/custom-inputs", customInputs);
app.use("/api/contact-data", contactData);

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
