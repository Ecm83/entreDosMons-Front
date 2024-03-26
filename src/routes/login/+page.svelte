<script>
	import CustomButton from '$lib/components/CustomButton.svelte';
	import Form from '$lib/components/Form.svelte';
	import Input from '../../lib/components/Input.svelte';
	import { login } from '$lib/api/apiCalls.js';
	import { user } from '$lib/stores/user.js';
	import { goto } from '$app/navigation';

	let emailValue = '';
	let passwordValue = '';
	let errorMessage = '';

	async function loginHandler() {
		try {
			const data = await login({ email: emailValue, password: passwordValue });
			if (data && data.user) {
				user.set({ user: data.user, token: data.token });
				localStorage.setItem('token', JSON.stringify(data.token));
				console.log('Inici de sessió correcte');
				if (data.user.role === 'admin') {
					goto('/dashboard');
				} else {
					goto('/selectFilter');
				}
				errorMessage = '';
			} else {
				errorMessage = 'Error al iniciar sessió';
			}
		} catch (error) {
			errorMessage = error.message || 'Error desconegut al iniciar sessió';
		}
	}
</script>

<Form
	formName="Accedeix"
	formClass="max-w-xl mx-auto p-5 border rounded-lg shadow-md bg-white"
	fieldsetClass=" space-y-5 p-4 rounded-md w-100%"
	legendClass="text-center text-2xl"
>
	<Input divId="email" inputDescription="Email" inputType="email" bind:inputValue={emailValue} />
	<Input
		divId="password"
		inputDescription="Contrasenya"
		inputType="password"
		bind:inputValue={passwordValue}
	/>
	{#if errorMessage}
		<p class="text-red-500">{errorMessage}</p>
	{/if}
	<div class="mt-5 p-2">
		<CustomButton
			btnClasses={'text-white w-full bg-primary-50 hover:bg-secondary-50 hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform mt-5 color-white'}
			handleClick={loginHandler}
			buttonText={'Iniciar sessió'}
		/>
	</div>
</Form>
