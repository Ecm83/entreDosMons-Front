export async function handle({ request, resolve }) {
	const session = request.locals.session || {}; // Obtén la sesión desde `request.locals`
	// Aquí podrías agregar más lógica para verificar o modificar la sesión

	// Agrega la sesión al objeto de request para que esté disponible en todas partes
	request.locals.user = session.user;

	// Continúa con el procesamiento del request
	const response = await resolve(request);

	// Aquí puedes modificar la respuesta si es necesario

	return response;
}
