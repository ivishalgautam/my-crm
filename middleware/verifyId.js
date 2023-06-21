const { default: mongoose } = require("mongoose");

// Middleware to check valid ID
const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  next();
};

module.exports = { validateId };
