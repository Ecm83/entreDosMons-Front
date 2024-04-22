import { suppliers } from '$lib/stores';

/**
 * * Get all suppliers
 */
export const getSuppliers = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/suppliers`);

		const { ok, status } = response;

		if (!ok) {
			throw new Error(`HTTP error! status: ${status}`);
		}

		const data = await response.json();
		console.log(data);
		suppliers.set(data);

		// return data;
	} catch (error) {
		console.error(error);
		return { error: error.message, status: error.status };
	}
};

/**
 * * Create new supplier
 */
export async function addSupplier(
	companyName,
	brandName,
	country,
	city,
	adress,
	CP,
	businessPhone,
	contactName,
	contactPhone,
	businessEmail,
	contactEmail,
	description
) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/suppliers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				companyName,
				brandName,
				country,
				city,
				adress,
				CP,
				businessPhone,
				contactName,
				contactPhone,
				businessEmail,
				contactEmail,
				description
			})
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

/**
 * * Delete supplier
 */
export async function deleteSupplier(id) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/suppliers/${id}`, {
			method: 'DELETE'
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
}
