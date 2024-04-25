import { soils } from '$lib/stores';

/*
 *GET all soils
 */

export const getAllSoils = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/soils`, {
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
		soils.set(data);
		console.log('Soils log in api calls:', data);

		// return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

/*
 *Add new soil
 */
export async function addSoil(soil, description, effect) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/soils`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ soil, description, effect })
		});

		// if (!response.ok) {
		// 	const errorData = await response.json();
		// 	throw new Error(errorData.message || 'Error occurred while adding soil');
		// }

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}

/*
 *Delete soil by id
 */
export async function deleteSoil(id) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/soils/${id}`, {
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
 * Update soil
 */

export async function updateSoil(id, soil, description, effect) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/soils/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ soil, description, effect })
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
