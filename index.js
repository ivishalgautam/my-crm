require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const connectDB = require("./database/db");
const morgan = require("morgan");
const CookieParser = require("cookie-parser");

// routes import
const authRoutes = require("./router/auth/login");
const userRoutes = require("./router/auth/user");
const contactRoutes = require("./router/contact");
const noteRoutes = require("./router/note");
const todoRoutes = require("./router/todo/todo");
const todoPlanRoutes = require("./router/todo/todoPlan");
const todoPlanStepRoute = require("./router/todo/todoPlanStep");
const appointmentRoutes = require("./router/appointment");
const attachmentRoutes = require("./router/attachment");
const agendaRoutes = require("./router/agenda");
const socialRoutes = require("./router/social");
const specialEventRoutes = require("./router/specialEvent");
const dealRoutes = require("./router/deal/deal");
const dealTypeRoutes = require("./router/deal/dealType");
const dealStageRoutes = require("./router/deal/dealStage");
const dealFieldRoutes = require("./router/deal/dealField");
const customInputs = require("./router/customInputs");
const contactData = require("./router/data");
const followUpRoutes = require("./router/followUp");
const dashBoardRoutes = require("./router/dashboard");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./middleware/verifyToken");

connectDB();
app.use(express.json());
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(CookieParser());

app.use((req, res, next) => {
  if (req.path === "/api/auth/login" || req.path === "/api/attachments") {
    next();
  } else {
    verifyToken(req, res, next);
  }
});

app.use((req, res, next) => {
  // console.log(req.method);
  if (req.method === "DELETE") {
    console.log("delete");
    verifyTokenAndAuthorization(req, res, next);
  } else {
    next();
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/todo-plans", todoPlanRoutes);
app.use("/api/todo-plan-steps", todoPlanStepRoute);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/agenda-assistant", agendaRoutes);
app.use("/api/socials", socialRoutes);
app.use("/api/special-events", specialEventRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/deal-types", dealTypeRoutes);
app.use("/api/deal-stages", dealStageRoutes);
app.use("/api/deal-fields", dealFieldRoutes);
app.use("/api/custom-inputs", customInputs);
app.use("/api/contact-data", contactData);
app.use("/api/follow-ups", followUpRoutes);
app.use("/api/dashboard", dashBoardRoutes);
app.get("/", (req, res) => {
  res.json({ message: "welcome to my crm." });
});

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
