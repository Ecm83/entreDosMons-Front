import { regions } from '../stores/regions.js';

/*
 *Get all regions
 */
export const getAllRegions = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/regions`);

		const { ok, status } = response;

		if (!ok) {
			throw new Error(`HTTP error! status: ${status}`);
		}

		const data = await response.json();
		console.log(data);
		regions.set(data);

		// return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

/*
 *Delete region
 */
export const deleteRegion = async (id) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/regions/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const { ok, status } = response;

		if (!ok) {
			throw new Error(`HTTP error! status: ${status}`);
		}

		const data = await response.json();
		console.log(data);

		getAllRegions();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

/*
 *Create region
 */
export const addRegion = async (region, description, countryId) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/regions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ region, countryId, description })
		});

		// const { ok, status } = response;

		// if (!ok) {
		// 	throw new Error(`HTTP error! status: ${status}`);
		// }

		const data = await response.json();
		console.log(data);

		getAllRegions();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

// Update region
export const updateRegion = async (id, region, description, countryId) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/regions/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ region, countryId, description })
		});

		const { ok, status } = response;

		if (!ok) {
			throw new Error(`HTTP error! status: ${status}`);
		}

		const data = await response.json();
		console.log(data);

		getAllRegions();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};
