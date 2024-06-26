const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../models/userModel");

//protect routes
const protect = asyncHandler(async (req, res, next) => {
	let token;

	// read the JWT from the cookie
	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select("-password"); // here userId is defined in payload
			next();
			res.status(401);
			throw new Error("Not authenticated , token failed ");
		} catch (error) {}
	} else {
		res.status(401);
		throw new Error("Not authenticated , no token basically ");
	}
});

// admin middleware
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Not autheorized as admin  ");
	}
};

module.exports = {
	protect,
	admin,
};
