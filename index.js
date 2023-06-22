require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const contactsRoute = require("./router/contact");
const notesRoute = require("./router/note");
const todosRoute = require("./router/todo");
const { default: mongoose } = require("mongoose");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("connected with database"));

app.use("/api/contacts", contactsRoute);
app.use("/api/notes", notesRoute);
app.use("/api/todos", todosRoute);

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
