import React from "react";
import "../../styles/emptyComponent.css";
import paleta from "../../img/paleta.gif";

export default function EmptyComponet() {
	return (
		<div className="no-accounts-container">
			<img src={paleta} alt="Wallet vacío" className="no-accounts-image" />
			<h2>Inventario vacío</h2>
			<p>
				Por favor, añade los productos de tu <strong>Inventario</strong>.
			</p>
		</div>
	);
}
