<script>
	import { CustomButton, Form, Input } from '$lib/components/atoms';
	import { register } from '$lib/api/apiCalls';

	let inputNameValue = '';
	let inputSurnameValue = '';
	let inputEmailValue = '';
	let inputPasswordValue = '';
	let inputPasswordConfirmationValue = '';
	let buttonText = `Registra't`;

	let errorName = '';
	let errorSurname = '';
	let errorEmail = '';
	let errorPassword = '';
	let errorPasswordConfirmation = '';

	async function registerHandler() {
		errorName = '';
		errorSurname = '';
		errorEmail = '';
		errorPassword = '';
		errorPasswordConfirmation = '';

		// Validaciones
		if (!inputNameValue) errorName = 'Introdueix el teu nom si us plau.';
		if (!inputSurnameValue) errorSurname = 'Introdueix els teus cognoms si us plau.';

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!inputEmailValue) {
			errorEmail = 'Introdueix el teu mail si us plau.';
		} else if (!emailPattern.test(inputEmailValue)) {
			errorEmail = 'Introdueix el teu email si us plau.';
		}

		const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
		if (!inputPasswordValue) {
			errorPassword = 'Introdueix la teva contrasenya si us plau.';
		} else if (!passwordPattern.test(inputPasswordValue)) {
			errorPassword =
				'La contrassenya te que tindre al menys, una majúscula, una minúscula y un carácter especial.';
		}

		if (inputPasswordValue !== inputPasswordConfirmationValue) {
			errorPasswordConfirmation = 'Les contrasenyes no coincideixen.';
		}

		if (errorName || errorSurname || errorEmail || errorPassword || errorPasswordConfirmation) {
			return;
		}

		// Intento de registro
		try {
			const user = {
				username: inputNameValue,
				userSurname: inputSurnameValue,
				email: inputEmailValue,
				password: inputPasswordValue
			};
			const newUser = await register(user);
			inputNameValue = '';
			inputSurnameValue = '';
			inputEmailValue = '';
			inputPasswordValue = '';
			inputPasswordConfirmationValue = '';
			alert(
				'Registre completat amb éxit. Si us plau, revisa el teu email per comfirmar.',
				JSON.stringify(newUser)
			);
		} catch (error) {
			console.error(`Error al registrar l' usuari:`, error);
			error(`Error al registrar l' usuari. Si us plau intenta-ho de nou.`);
		}
	}
</script>

<Form
	formName="Registre d' Usuari"
	formClass="max-w-xl mx-auto p-5 border rounded-lg shadow-md bg-white"
	fieldsetClass="flex flex-col items-center"
	legendClass="text-center text-2xl mb-5  "
>
	<Input
		divId="div-name"
		inputDescription="Nom"
		inputType="text"
		bind:inputValue={inputNameValue}
	/>
	{#if errorName}
		<div class="mt-2 p-2">
			<p class="text-red-500 text-xs italic">{errorName}</p>
		</div>
	{/if}

	<Input
		divId="div-surnames"
		inputDescription="Cognoms"
		inputType="text"
		bind:inputValue={inputSurnameValue}
	/>
	{#if errorSurname}
		<div class="mt-2 p-2">
			<p class="text-red-500 text-xs italic">{errorSurname}</p>
		</div>
	{/if}

	<Input
		divId="div-email"
		inputDescription="Correu electrònic"
		inputType="email"
		bind:inputValue={inputEmailValue}
	/>
	{#if errorEmail}
		<div class="mt-2 p-2">
			<p class="text-red-500 text-xs italic">{errorEmail}</p>
		</div>
	{/if}

	<Input
		divId="div-password"
		inputDescription="Contrasenya"
		inputType="password"
		bind:inputValue={inputPasswordValue}
	/>
	{#if errorPassword}
		<div class="mt-2 p-2">
			<p class="text-red-500 text-xs italic">{errorPassword}</p>
		</div>
	{/if}

	<Input
		prop="new-color"
		divId="div-passwordRepeat"
		inputDescription="Repeteix la contrasenya"
		inputType="password"
		bind:inputValue={inputPasswordConfirmationValue}
	/>
	{#if errorPasswordConfirmation}
		<div class="mt-2 p-2">
			<p class="text-red-500 text-xs italic">{errorPasswordConfirmation}</p>
		</div>
	{/if}

	<div class="mt-5 p-2">
		<CustomButton
			btnClasses={'text-white w-full bg-primary-50 hover:bg-secondary-50 hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform mt-5 color-white'}
			handleClick={registerHandler}
			{buttonText}
		/>
	</div>
</Form>
