<script>
	import { Modal, Button } from 'flowbite-svelte';
	import { Input } from '$lib/components/atoms';
	import { VoiceRecognition } from '$lib/components/molecules';
	import { createEventDispatcher } from 'svelte';
	import { updateWineType } from '$lib/api/wineTypesCalls';

	export let openModal = false;
	export let wineType;
	export let description;
	export let id;

	const dispatch = createEventDispatcher();

	const handleUpdateGrape = async () => {
		const result = await updateWineType(id, wineType, description);
		if (result.message === `Wine type with ID: ${id} updated successfully`) {
			dispatch('updateWineType', { status: 'success' });
		} else {
			console.error('Error updating wine type');
			dispatch('updateWineType', { status: 'error' });
		}
	};
</script>

<Modal title="Modificar varietat de raïm" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md">
		<Input
			divId="grape"
			inputDescription="Introdueix una varietat de raïm"
			inputType="text"
			bind:inputValue={wineType}
		/>
	</div>
	<div class="mb-4">
		<VoiceRecognition
			placeholder="Introdueix la descripció de la varietat de raïm"
			lblSpech="Descripció de la varietat de raïm"
			bind:textValue={description}
		/>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleUpdateGrape}
		>
			Actualiza</Button
		>
		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white">Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
