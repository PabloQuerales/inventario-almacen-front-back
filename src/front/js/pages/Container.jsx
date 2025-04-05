import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Card from "../component/Cards.jsx";
import Modal from "../component/Modal.jsx";
import EmptyComponet from "../component/EmptyComponent.jsx";

export default function Container() {
	const { store, actions } = useContext(Context);
	const [list, setList] = useState([]);

	useEffect(() => {
		actions.getItems();
	}, []);

	return (
		<div className="container d-flex flex-column justify-content-center">
			<div className="row justify-content-center">
				{store.items.length > 0 ? (
					store.items.map((element) => {
						return <Card name={element.name} quantity={element.quantity} type={element.type} key={element.id} id={element.id} />;
					})
				) : (
					<EmptyComponet />
				)}
			</div>
			<Modal setList={setList} list={list} />
		</div>
	);
}
