const Brand = require("../models/Brand");

exports.createBrand = async (req, res) => {
  const { brandName, brandLogo, categories } = req.body;
  try {
    const brand = new Brand({ brandName, brandLogo, categories });
    await brand.save();
    res.status(201).json({ message: "Brand created", brand });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};