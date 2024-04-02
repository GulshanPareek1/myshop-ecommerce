const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

connectDB(); //mongodb connection
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());
app.get("/", (req, res) => {
	res.send(`API is running!!`);
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const _dirname = path.resolve(); //set __dirname to current directory
app.use("/uploads", express.static(path.join(_dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`API is running on port ${port}`);
});
