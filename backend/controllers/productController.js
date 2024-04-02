const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");

//@desc update a product
//@route  PUT /api/products/:id
//@access   private/admin

const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name || product.name;
		product.price = price || product.price;
		product.description = description || product.description;
		product.image = image || product.image;
		product.brand = brand || product.brand;
		product.category = category || product.category;
		product.countInStock = countInStock || product.countInStock;

		const updatedProduct = await product.save();
		res.status(200).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

//@desc Delete a product
//@route  DELETE /api/products/:id
//@access   private/admin

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await Product.deleteOne({ _id: product._id });
		res.status(200).json({
			message: "Product deleted",
		});
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
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

//@desc Create a Product
//@route  POST /api/products
//@access   private/Admin

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample Name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		description: "Sample Description",
		category: "Sample Category",
		brand: "Sample Brand",
		countInStock: 0,
		rating: 0,
		numReviews: 0,
	});
	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

//@desc fetch all products
//@route  GET /api/products
//@access   Public

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.json(products);
});

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
