const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			items: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getItems: async () => {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/get-items`, requestOptions);
					const result = await response.json();
					setStore({ items: result });
				} catch (error) {
					console.error(error);
				}
			},
			postItems: async (newItem) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				console.log(newItem);

				const raw = JSON.stringify({
					name: newItem.name,
					quantity: parseInt(newItem.quantity),
					type: newItem.type
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/add-item`, requestOptions);
					const result = await response.json();
					console.log(result);
				} catch (error) {
					console.error(error);
				}
			}
		}
	};
};

export default getState;
