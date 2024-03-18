/*
 * The register function sends a POST request to the /auth/register endpoint of the API with the user's username, userSurname, email, and password.
 */

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

/*
 * The login function sends a POST request to the /auth/login endpoint of the API with the user's email and password.
 */
export async function login(user) {
	try {
		const { email, password } = user;
		const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
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
