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

/*
 *Add new country
 */
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

/*
 *Get country by name
 */
export async function getCountryByName(country) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/countries/name/${country}`);

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
}

/*
 *update country by name
 */
export async function updateCountryByName(country, description) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/countries/name/${country}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ country, description })
		});

		const data = await response.json();

		if (!response.ok || data.error) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
}

/*
 *delete country by name
 */
export async function deleteCountryByName(country) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/countries/name/${country}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
}
