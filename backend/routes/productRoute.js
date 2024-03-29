const express = require("express");
const router = express.Router();
const products = require("../data/product");
const {
	getProducts,
	getProductById,
} = require("../controllers/productController");

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

// router.get("/:id", getProductById);

module.exports = router;
