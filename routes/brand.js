const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const authenticate = require("../middleware/auth");

router.post("/", authenticate, brandController.createBrand);
router.get("/", brandController.getAllBrands);

module.exports = router;
