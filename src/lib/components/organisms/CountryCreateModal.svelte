<script>
	import { addCountry, getAllCountries } from '$lib/api/countryCalls';
	import { Button, Modal } from 'flowbite-svelte';
	import { Input } from '$lib/components/atoms';
	import { VoiceRecognition } from '$lib/components/molecules';
	import { createEventDispatcher } from 'svelte';

	export let openModal = false;

	let dispatch = createEventDispatcher();

	$: newCountry = '';
	$: description = '';

	const handleCreateCountry = async () => {
		try {
			const createdCountry = await addCountry(newCountry, description);
			if (createdCountry.message === 'Country created successfully') {
				await getAllCountries();
				dispatch('createCountry', { status: 'success' });
			} else {
				console.error('Error creating country');
				dispatch('createCountry', { status: 'error' });
			}
		} catch (error) {
			console.error('Error creating country');
			dispatch('createCountry', { status: 'error' });
		} finally {
			newCountry = '';
			description = '';
		}
	};
</script>

<Modal title="Crear país" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Input
				divId="country"
				inputDescription="Introdueix un país"
				inputType="text"
				bind:inputValue={newCountry}
			/>
		</div>
		<div class="mb-4">
			<VoiceRecognition
				placeholder="Introdueix un país"
				lblSpech="Nom del país"
				bind:textValue={description}
			/>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleCreateCountry}>Crea</Button
		>
		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white">Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
