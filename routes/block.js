const express = require("express");
const router = express.Router();
const blockController = require("../controllers/blockController");
const authenticate = require("../middleware/auth");

router.post("/block", authenticate, blockController.blockUser);
router.post("/unblock", authenticate, blockController.unblockUser);

module.exports = router;
