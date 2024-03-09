export async function register(user) {
	try {
		const { username, userSurname, email, password } = user;
		const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				userSurname,
				email,
				password
			})
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
