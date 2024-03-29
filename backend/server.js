const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoute");

const port = process.env.PORT || 5000;

connectDB(); //mongodb connection
const app = express();

app.get("/", (req, res) => {
	res.send(`API is running!!`);
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`API is running on port ${port}`);
});
