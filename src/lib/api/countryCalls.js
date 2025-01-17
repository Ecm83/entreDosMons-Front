import { countries } from '$lib/stores';

/*
 *Get all countries
 */
export const getAllCountries = async () => {
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
		countries.set(data);

		// return data;
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

		const { ok, status } = response;

		if (!ok) {
			throw new Error(`HTTP error! status: ${status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}

/*
 * get country by name
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
 *Delete country
 */
export async function deleteCountry(id) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/countries/${id}`, {
			method: 'DELETE'
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
}

/*
 *Update country
 */
export async function updateCountry(id, country, description) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/countries/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ country, description })
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
}
