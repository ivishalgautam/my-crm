const User = require("../../model/User");
const jwt = require("jsonwebtoken");

// login user
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "user not exist!" });
    if (user.password !== req.body.password)
      return res.status(401).json({ error: "wrong credentials!" });

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );

    const { password, ...userData } = user._doc;
    res.json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// read
async function readUser(req, res) {
  if (req.user.isAdmin) {
    console.log("this is admin");
  }
  res.json(req.user);
}

// logout
async function logout(req, res) {
  res.clearCookie("admin");
  res.clearCookie("token");
  res.json(req.cookies);
}

module.exports = { login, readUser, logout };
