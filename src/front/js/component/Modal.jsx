import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/modal.css";

export default function Modal() {
	const { actions } = useContext(Context);
	const [inputValue, setInputValue] = useState({
		name: "",
		quantity: 0,
		type: ""
	});

	const addItem = () => {
		if (inputValue.name != "" && inputValue.type != "" && inputValue.quantity <= 10 && inputValue.quantity >= 0) {
			actions.postItems(inputValue);
			setInputValue({
				name: "",
				quantity: 0,
				type: ""
			});
		} else {
			alert(
				"------------------------INFORMACIÓN INCOMPLETA-------------------- RECUERDA ESCRIBIR UN NOMBRE, ESCOGER UN TIPO E INTRODUCIR UNA CANTIDAD DE MAXIMO 10 UNIDADES"
			);
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue({ ...inputValue, [name]: value });
	};
	return (
		<>
			<button type="button" className="add-item btn btn-secondary btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
				<i className="bi bi-plus-lg"></i>
			</button>
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Agregar un artículo al almacen
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body d-flex gap-5">
							<input
								type="text"
								className="form-control"
								placeholder="Artículo"
								value={inputValue.articulo}
								aria-label="Artículo"
								name="name"
								required
								onChange={handleChange}
							/>
							<input
								type="text"
								className="form-control w-25"
								placeholder="Cant."
								value={inputValue.cant}
								aria-label="Cant."
								name="quantity"
								required
								onChange={handleChange}
							/>
						</div>
						<div className="px-5 pb-3">
							<select
								className="form-select mr-5 "
								aria-label="Default select example"
								name="type"
								required
								value={inputValue.type}
								onChange={handleChange}>
								<option value="">Escoge una categoría</option>
								<option value="despensa">Despensa</option>
								<option value="aseo">Aseo</option>
								<option value="higiene">Higiene</option>
								<option value="ocio">Ocio</option>
							</select>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-bs-dismiss="modal">
								Cancelar
							</button>
							<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addItem}>
								Agregar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
