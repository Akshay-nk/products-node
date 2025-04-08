const Block = require("../models/Block");

exports.blockUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const block = new Block({ blocker: req.user._id, blocked: userId });
    await block.save();
    res.status(201).json({ message: "User blocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.unblockUser = async (req, res) => {
  const { userId } = req.body;
  try {
    await Block.findOneAndDelete({ blocker: req.user._id, blocked: userId });
    res.json({ message: "User unblocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};