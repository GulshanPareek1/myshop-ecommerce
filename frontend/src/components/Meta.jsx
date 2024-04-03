import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta
				name="description"
				content={description}
			/>
			<meta
				name="keywords"
				content={keywords}
			/>
		</Helmet>
	);
};

Meta.defaultProps = {
	title: "Welcome to MyShop",
	description: "Here we have mostly used products in cheap rate",
	keywords: "electronics , hardware , buy electronics",
};

export default Meta;
