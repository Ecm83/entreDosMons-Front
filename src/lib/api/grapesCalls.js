import { grapes } from '$lib/stores';

/**
 * * Get all grapes
 */
export const getAllGrapes = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/grapes`);

		const { ok, status } = response;

		if (!ok) {
			throw new Error(`HTTP error! status: ${status}`);
		}

		const data = await response.json();
		console.log(data);
		grapes.set(data);

		// return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

/*
 * Create new grape
 */
export async function addGrape(grape, description) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/grapes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ grape, description })
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
 * Delete grape
 */
export async function deleteGrape(id) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/grapes/${id}`, {
			method: 'DELETE'
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}

/*
 * Update grape
 */

export async function updateGrape(id, grape, description) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/grapes/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				grape,
				description
			})
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}
