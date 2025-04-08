const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticate = require("../middleware/auth");

router.post("/", authenticate, productController.createProduct);
router.get("/", authenticate, productController.getProducts);
router.get("/my-products", authenticate, productController.getOwnProducts);
router.put("/:id", authenticate, productController.updateProduct);
router.delete("/:id", authenticate, productController.deleteProduct);

module.exports = router;
