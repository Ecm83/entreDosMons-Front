import { cellars } from '$lib/stores/cellars';

/*
 *Get all cellars
 */

export const getAllCellars = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/cellars`);

		const { ok, status } = response;

		if (!ok) {
			throw new Error(`HTTP error! status: ${status}`);
		}

		const data = await response.json();
		console.log(data);
		cellars.set(data);

		// return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

/*
 *Delete a cellar
 */
export async function deleteCellar(id) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/cellars/${id}`, {
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
 *Create a cellar
 */
export async function createCellar(cellar, description, distance, regionId) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/cellars`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(cellar, description, distance, regionId)
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
