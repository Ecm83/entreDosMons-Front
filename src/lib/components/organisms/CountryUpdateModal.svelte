<script>
	import { Modal, Button } from 'flowbite-svelte';
	import { Input } from '$lib/components/atoms';
	import { VoiceRecognition } from '$lib/components/molecules';
	import { createEventDispatcher } from 'svelte';
	import { updateCountry } from '$lib/api/countryCalls';

	export let openModal = false;
	export let country;
	export let description;
	export let id;

	const dispatch = createEventDispatcher();

	const handleUpdateCountry = async () => {
		const result = await updateCountry(id, country, description);
		if (result.message === `Country with ID: ${id} updated successfully`) {
			dispatch('updateCountry', { status: 'success' });
		} else {
			console.error('Error updating country');
			dispatch('updateCountry', { status: 'error' });
		}
	};
</script>

<Modal title="Modificar país" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md">
		<Input
			divId="country"
			inputDescription="Introdueix un país"
			inputType="text"
			bind:inputValue={country}
		/>
	</div>
	<div class="mb-4">
		<VoiceRecognition
			placeholder="Introdueix la descripció del país"
			lblSpech="Descripció del país"
			bind:textValue={description}
		/>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleUpdateCountry}
		>
			Actualiza</Button
		>
		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
            hover:scale-50 transition-transform color-white">Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
