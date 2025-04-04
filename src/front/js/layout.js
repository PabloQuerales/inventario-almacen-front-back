import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import Container from "./pages/Container.jsx";
import MainMenu from "./pages/MainMenu.jsx";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

	return (
		<div>
			<BrowserRouter basename={basename}>
				<Routes>
					<Route element={<MainMenu />} path="/" />
					<Route element={<Container />} path="/inventario" />
					<Route element={<h1>Not found!</h1>} path="*" />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
