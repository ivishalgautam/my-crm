const User = require("../../model/User");

// login user
async function login(req, res) {
  try {
    const { name, email, password, phone, designation } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "user not found!" });
    if (user.password !== password)
      return res.status(401).json({ error: "Wrong email or password!" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = login;
