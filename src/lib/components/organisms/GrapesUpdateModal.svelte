<script>
	import { Modal, Button } from 'flowbite-svelte';
	import { Input } from '$lib/components/atoms';
	import { VoiceRecognition } from '$lib/components/molecules';
	import { createEventDispatcher } from 'svelte';
	import { updateGrape } from '$lib/api/grapesCalls';

	export let openModal = false;
	export let grape;
	export let description;
	export let id;

	const dispatch = createEventDispatcher();

	const handleUpdateGrape = async () => {
		const result = await updateGrape(id, grape, description);
		if (result.message === `Grape with ID: ${id} updated successfully`) {
			console.log('Grape updated successfully');
			dispatch('updateGrape', { status: 'success' });
			console.log('Grape updated successfully');
		} else {
			console.error('Error updating grape');
			dispatch('updateGrape', { status: 'error' });
			console.error('Error updating grape');
		}
	};
</script>

<Modal title="Modificar varietat de raïm" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md">
		<Input
			divId="grape"
			inputDescription="Introdueix una varietat de raïm"
			inputType="text"
			bind:inputValue={grape}
		/>
	</div>
	<div class="mb-4">
		<VoiceRecognition
			forLbl="grape"
			lblTxt="Descripció de la varietat de raïm"
			id="description"
			placeholder="Introdueix la descripció de la varietat de raïm"
			name="grape"
			bind:textValue={description}
		/>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleUpdateGrape}
			on:updateGrape
		>
			Actualiza</Button
		>
		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white">Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
