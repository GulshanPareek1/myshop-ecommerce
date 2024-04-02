const express = require("express");
const router = express.Router();
const products = require("../data/product");
const {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
	.route("/:id")
	.get(getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

// router.get("/:id", getProductById);

module.exports = router;
