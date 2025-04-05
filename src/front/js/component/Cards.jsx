import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import despensa from "../../img/despensa.png";
import higiene from "../../img/higiene-personal.png";
import limpieza from "../../img/limpieza.png";
import panaderia from "../../img/panaderia.png";
import "../../styles/card.css";

export default function Card(props) {
	const [typeImg, setTypeImg] = useState("");
	const { store, actions } = useContext(Context);
	const [count, setCount] = useState(parseInt(props.quantity));

	const sum = async () => {
		if (count < 10) {
			setCount(count + 1);
		}
	};

	const rest = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	};
	const handleDelete = () => {
		actions.deleteItem(props.id);
	};

	useEffect(() => {
		if (props.type === "despensa") {
			setTypeImg(despensa);
		} else if (props.type === "ocio") {
			setTypeImg(panaderia);
		} else if (props.type === "aseo") {
			setTypeImg(limpieza);
		} else if (props.type === "higiene") {
			setTypeImg(higiene);
		}
	}, [store.items]);

	useEffect(() => {
		actions.editItem(count, props.id);
	}, [count]);

	return (
		<div className="card text-center m-1" style={{ width: "12rem" }}>
			<button type="button" className="btn-close" aria-label="Close" onClick={handleDelete}></button>
			<div className="card-body p-2">
				<h5 className="card-title m-0">{props.name}</h5>
				<p className="m-0">{props.type}</p>
				<img src={typeImg} alt="Wallet vacío" className="no-accounts-image" style={{ width: "2.5rem" }} />
				<div className="d-flex justify-content-between align-items-center text-center">
					<button className="btn btn-secondary w-25" onClick={rest}>
						-
					</button>
					<p className="m-0">{count}</p>
					<button className="btn btn-secondary w-25" onClick={sum}>
						+
					</button>
				</div>
			</div>
		</div>
	);
}
