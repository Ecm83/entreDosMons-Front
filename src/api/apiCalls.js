export async function register(user) {
	try {
		const { name, surname, email, password, password_confirmation } = user;
		const response = await fetch(import.meta.env.VITE_REGISTER_POST, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				surname,
				email,
				password,
				password_confirmation
			})
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
