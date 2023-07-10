const User = require("../../model/User");

// create user
async function createUser(req, res) {
  try {
    const { name, email, password, phone, designation } = req.body;
    const user = new User({ name, email, password, phone, designation });
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update user
async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found!" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete user
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found!" });
    res.json("user deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get user
async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found!" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    if (users.length <= 0)
      return res.json({ error: "we have no members in pur team!" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createUser, updateUser, deleteUser, getUser, getUsers };
