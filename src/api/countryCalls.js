/*
 *Get all countries
 */
export const countries = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/countries`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const { ok, status } = response;

		if (!ok) {
			throw new Error(`HTTP error! status: ${status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

//Add new country
export async function addCountry(country, description) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/countries`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ country, description })
		});

		// if (!response.ok) {
		//   const errorData = await response.json();
		//   throw new Error(errorData.message || 'Error occurred while adding country');
		// }

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}
