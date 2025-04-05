import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainMenu.css";
export default function MainMenu() {
	const navigate = useNavigate();
	return (
		<div className="main-menu">
			<button
				type="button"
				className="btn-main"
				onClick={() => {
					navigate("/inventario");
				}}>
				Ver Inventario
			</button>
			<button
				type="button"
				className="btn-main"
				onClick={() => {
					navigate("/lista");
				}}>
				Ver Lista de compras
			</button>
		</div>
	);
}
