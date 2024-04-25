import { labels } from '$lib/stores';

/*
 *Get all labels
 */
export const getLabels = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/labels`, {
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
		labels.set(data);

		// return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

/**
 * delete label
 */

export async function deleteLabel(id) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/labels/${id}`, {
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
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}
