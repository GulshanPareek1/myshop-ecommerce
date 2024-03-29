const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalURL}`);
	res.status(404);
	next(error);
};

const errorHandler = (error, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = error.message;

	// check for mongodb bad object
	if (error.name === "CastError" && error.kind === "ObjectId") {
		message = `Resource Not Found`;
		statusCode = 404;
	}

	res.status(statusCode).json({
		message,
		stack: process.env.NODE_ENV === "production" ? "🍥" : error.stack,
	});
};

module.exports = {
	notFound,
	errorHandler,
};
