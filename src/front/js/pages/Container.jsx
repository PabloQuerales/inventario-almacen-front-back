import React, { useState } from "react";
import Card from "../component/Cards.jsx";
import Modal from "../component/Modal.jsx";
import EmptyComponet from "../component/EmptyComponent.jsx";

export default function Container() {
	const [list, setList] = useState([]);

	return (
		<div className="container d-flex flex-column justify-content-center">
			<div className="row justify-content-center">
				{list.length > 0 ? (
					list.map((element) => {
						return (
							<Card articulo={element.articulo} cant={element.cant} setList={setList} type={element.type} key={Math.floor(Math.random() * 9999)} />
						);
					})
				) : (
					<EmptyComponet />
				)}
			</div>
			<Modal setList={setList} list={list} />
		</div>
	);
}
