import { regions } from '$lib/stores';

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
