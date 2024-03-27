import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Outlet } from "react-router-dom";
//write some code for this component?
function App() {
	return (
		<>
			<Header />
			<main className="py-3">
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</>
	);
}

export default App;