import { sulphites } from '../../lib/stores/sulphites.js';

/*
 * GET all sulphites
 */
export const getSulphites = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/sulphites`, {
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
		sulphites.set(data);

		// return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

/*
 * Add new sulphite
 */
export async function addSulphite(sulphiteMin, sulphiteMax) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/sulphites`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ sulphiteMin, sulphiteMax })
		});

		// if (!response.ok) {
		// 	const errorData = await response.json();
		// 	throw new Error(errorData.message || 'Error occurred while adding sulphite');
		// }

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}

/*
 * Delete sulphite
 */
export async function deleteSulphite(id) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/sulphites/${id}`, {
			method: 'DELETE'
		});

		// if (!response.ok) {
		//   const errorData = await response.json();
		//   throw new Error(errorData.message || 'Error occurred while deleting sulphite');
		// }

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}
