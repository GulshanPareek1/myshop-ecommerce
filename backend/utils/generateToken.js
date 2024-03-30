const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
	// we using res (parameter ) bcz putting cookie in response
	const payload = { userId };
	const secret = process.env.JWT_SECRET;
	const token = jwt.sign(payload, secret, { expiresIn: "30d" });

	// set JWT as HTTP-Only cookie
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	});
};

module.exports = generateToken;
