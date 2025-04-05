import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShoppingList() {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Esto va ser una lista de compras</h1>
			<button
				type="button"
				className="btn-item home btn btn-secondary btn-modal"
				onClick={() => {
					navigate("/");
				}}>
				<i class="bi bi-house"></i>
			</button>
		</div>
	);
}
