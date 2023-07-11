const User = require("../../model/User");
const jwt = require("jsonwebtoken");

// login user
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "user not found!" });
    if (user.password !== req.body.password)
      return res.status(401).json({ error: "Wrong email or password!" });

    const { password, ...additionalData } = user._doc;
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY
    );
    res.cookie("isAdmin", user.isAdmin);
    res.cookie("access_token", accessToken);
    res.json({ ...additionalData, accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = login;
