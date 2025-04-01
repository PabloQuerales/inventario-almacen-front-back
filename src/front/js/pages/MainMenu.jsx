import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainMenu() {
	const navigate = useNavigate();
	return (
		<div>
			<button
				type="button"
				className="btn btn-secondary btn-modal"
				onClick={() => {
					navigate("/inventario");
				}}>
				Ver Inventario
			</button>
			<button
				type="button"
				className="btn btn-secondary btn-modal"
				onClick={() => {
					navigate("/lista");
				}}>
				Ver Lista de compras
			</button>
		</div>
	);
}
