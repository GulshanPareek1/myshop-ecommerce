import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
	const { userInfo } = useSelector((state) => state.auth);

	return userInfo && userInfo.isAdmin ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			replace
		/>
		//  replace here to provide past history of navigateion / redirect url
	);
};

export default PrivateRoute;
