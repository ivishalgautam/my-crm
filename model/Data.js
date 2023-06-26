const { default: mongoose } = require("mongoose");

const SourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String },
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const ReferralSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const TagSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Source = mongoose.model("Source", SourceSchema);
const Category = mongoose.model("Category", CategorySchema);
const Referral = mongoose.model("Referral", ReferralSchema);
const Tag = mongoose.model("Tag", TagSchema);

module.exports = { Source, Category, Referral, Tag };
