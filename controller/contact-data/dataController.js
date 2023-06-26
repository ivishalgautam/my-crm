const { Source, Category, Referral, Tag } = require("../../model/Data");

// add data
async function addData(req, res) {
  const { type } = req.query;
  if (!type) return res.status(400).json({ error: "Please pass some query" });
  let data;
  try {
    switch (type) {
      case "source":
        data = new Source(req.body);
        break;
      case "category":
        data = new Category(req.body);
        break;
      case "referral":
        data = new Referral(req.body);
        break;
      case "tag":
        data = new Tag(req.body);
        break;

      default:
        return res
          .status(400)
          .json({ error: `Invalid 'type' value: '${type}'` });
    }
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update data
async function updateData(req, res) {
  const { type } = req.query;
  if (!type) return res.status(400).json({ error: "Please pass some query" });
  let data;
  try {
    switch (type) {
      case "source":
        data = await Source.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        break;
      case "category":
        data = await Category.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        break;
      case "referral":
        data = await Referral.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        break;
      case "tags":
        data = await Tag.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        break;

      default:
        return res
          .status(400)
          .json({ error: `Invalid 'type' value: '${type}'` });
    }
    if (!data) return res.status(404).json({ error: "not found!" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete data
async function deleteData(req, res) {
  const { type } = req.query;
  if (!type) return res.status(400).json({ error: "Please pass some query" });
  let data;
  try {
    switch (type) {
      case "source":
        data = await Source.findByIdAndDelete(req.params.id);
        break;
      case "category":
        data = await Category.findByIdAndDelete(req.params.id);
        break;
      case "referral":
        data = await Referral.findByIdAndDelete(req.params.id);
        break;
      case "tags":
        data = await Tag.findByIdAndDelete(req.params.id);
        break;

      default:
        return res
          .status(400)
          .json({ error: `Invalid 'type' value: '${type}'` });
    }
    if (!data) return res.status(404).json({ error: "not found!" });
    res.json("data deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get one data
async function getData(req, res) {
  const { type } = req.query;
  if (!type) return res.status(400).json({ error: "Please pass some query" });
  let data;
  try {
    switch (type) {
      case "source":
        data = await Source(req.params.id);
        break;
      case "category":
        data = await Category(req.params.id);
        break;
      case "referral":
        data = await Referral(req.params.id);
        break;
      case "tags":
        data = await Tag(req.params.id);
        break;

      default:
        return res
          .status(400)
          .json({ error: `Invalid 'type' value: '${type}'` });
    }
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all data
async function getAllData(req, res) {
  const sources = await Source.find();
  const categories = await Category.find();
  const referrals = await Referral.find();
  const tags = await Tag.find();

  res.json([...sources, ...categories, ...referrals, ...tags]);
}

module.exports = { addData, updateData, deleteData, getData, getAllData };
