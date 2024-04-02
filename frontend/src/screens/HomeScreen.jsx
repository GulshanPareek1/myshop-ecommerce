// import React from "react";
// import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
	// const [products, setProducts] = useState([]);

	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		const { data } = await axios.get("/api/products");
	// 		setProducts(data);
	// 	};

	// 	fetchProducts();
	// }, []);
	const { pageNumber } = useParams();
	const { data, isError, isLoading } = useGetProductsQuery({ pageNumber });

	return (
		<>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<div>{isError?.data?.message || isError.error}</div>
			) : (
				<>
					<h1>Latest Products</h1>
					<Row>
						{data.products.map((product) => (
							<Col
								key={product._id}
								xs={12}
								sm={6}
								md={4}
								lg={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={data.pages}
						page={data.page}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
