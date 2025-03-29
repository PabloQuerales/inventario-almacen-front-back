import React, { useState } from "react";

export default function Card(props) {
	const [count, setCount] = useState(parseInt(props.cant));
	const sum = () => {
		if (count < 10) {
			setCount(count + 1);
		}
	};
	const rest = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	};
	return (
		<div className="card text-center m-1" style={{ width: "12rem" }}>
			<div className="card-body p-2">
				<h5 className="card-title m-0">{props.articulo}</h5>
				<p className="m-0">{props.type}</p>
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
