const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");

//@desc fetch all products
//@route  GET /api/products
//@access   Public

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.json(products);
});

//@desc fetch a product
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findOne({ _id: req.params.id }); // .findById(req.params.id) both are same

	if (product) {
		return res.json(product);
	} else {
		res.status(404);
		throw new Error("Resource not found");
	}
});

module.exports = {
	getProducts,
	getProductById,
};
