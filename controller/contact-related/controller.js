const {
  Source,
  Category,
  Referral,
  Tag,
} = require("../../model/ContactRelated");

// add item
async function addItem(req, res) {
  const { type } = req.query;
  if (!type) return res.status(400).json({ error: "Please pass some query" });
  let item;
  try {
    switch (type) {
      case "source":
        item = new Source(req.body);
        console.log(req.body);
        break;
      case "category":
        item = new Category(req.body);
        break;
      case "referral":
        item = new Referral(req.body);
        break;
      case "tag":
        item = new Tag(req.body);
        break;

      default:
        return res
          .status(400)
          .json({ error: `Invalid 'type' value: '${type}'` });
    }
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete item
async function deleteItem(req, res) {
  const { type } = req.query;
  if (!type) return res.status(400).json({ error: "Please pass some query" });
  let item;
  try {
    switch (type) {
      case "source":
        item = new Source(req.body);
        console.log(req.body);
        break;
      case "category":
        item = new Category(req.body);
        break;
      case "referral":
        item = new Referral(req.body);
        break;
      case "tags":
        item = new Tag(req.body);
        break;

      default:
        return res
          .status(400)
          .json({ error: `Invalid 'type' value: '${type}'` });
    }
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getItems(req, res) {
  const sources = await Source.find();
  const categories = await Category.find();
  const referrals = await Referral.find();
  const tags = await Tag.find();

  res.json([...sources, ...categories, ...referrals, ...tags]);
}

module.exports = { addItem, getItems };
