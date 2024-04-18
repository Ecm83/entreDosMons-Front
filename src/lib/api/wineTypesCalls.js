import { wineTypes } from '$lib/stores/wineTypes';

/*
 * Get all wine types
 */
export async function getWineTypes() {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/wineTypes`);
	const data = await response.json();
	console.log('data log in wineTypesCalls:', data);
	wineTypes.set(data);
	return data;
}

/*
 * Add new wine type
 */
export async function addWineType(wineType, description) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/wineTypes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ wineType, description })
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}

/*
 * delete wine type by id
 */
export async function deleteWineType(id) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/wineTypes/${id}`, {
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
		return { error: error.message };
	}
}

/**
 * Update wine type
 */

export async function updateWineType(id, wineType, description) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/wineTypes/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				wineType,
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
