const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Block = require("../models/Block");

exports.createProduct = async (req, res) => {
  const { productName, description, price, category, brand, productImage } = req.body;
  try {
    const brandDoc = await Brand.findOne({ brandName: brand });
    if (!brandDoc || !brandDoc.categories.includes(category)) {
      return res.status(400).json({ message: "Invalid brand or category" });
    }

    const product = new Product({
      productName,
      description,
      price,
      category,
      brand,
      productImage,
      addedBy: req.user._id,
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  const { sortBy, brand, category, order = 'asc' } = req.query;
  let sortQuery = {};
  if (sortBy) {
    sortQuery[sortBy] = order === 'desc' ? -1 : 1;
  }

  try {
    const blocks = await Block.find({ blocked: req.user._id }).select("blocker");
    const blockedUserIds = blocks.map(b => b.blocker.toString());

    let filter = { addedBy: { $nin: blockedUserIds } };
    if (brand) filter.brand = brand;
    if (category) filter.category = category;

    const products = await Product.find(filter).sort(sortQuery);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOwnProducts = async (req, res) => {
  try {
    const products = await Product.find({ addedBy: req.user._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, addedBy: req.user._id });
    if (!product) return res.status(403).json({ message: "Not authorized" });
    Object.assign(product, req.body);
    await product.save();
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, addedBy: req.user._id });
    if (!product) return res.status(403).json({ message: "Not authorized" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};