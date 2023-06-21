require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const contactsRoute = require("./router/contact");
const { default: mongoose } = require("mongoose");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("connected with database"));

app.use("/contacts", contactsRoute);

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});
