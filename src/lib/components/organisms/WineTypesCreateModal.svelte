<script>
	import { addWineType, getWineTypes } from '$lib/api/wineTypesCalls';
	import { Button, Modal } from 'flowbite-svelte';
	import { Input } from '$lib/components/atoms';
	import { VoiceRecognition } from '$lib/components/molecules';
	import { createEventDispatcher } from 'svelte';

	export let openModal = false;

	let dispatch = createEventDispatcher();

	$: newWineTipe = '';
	$: description = '';

	const handleCreateWineType = async () => {
		const createdWineType = await addWineType(newWineTipe, description);
		if (createdWineType.message === 'Wine type created successfully') {
			await getWineTypes();
			dispatch('createWineType', { status: 'success' });
		} else {
			console.error('Error creating wine type');
			dispatch('createWineType', { status: 'error' });
		}
		newWineTipe = '';
		description = '';
	};
</script>

<Modal title="Crear nou tipus de vi" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Input
				divId="wineType"
				inputDescription="Introdueix un tipus de vi"
				inputType="text"
				bind:inputValue={newWineTipe}
			/>
		</div>
		<div class="mb-4">
			<VoiceRecognition
				bind:textValue={description}
				placeholder={'Introdueix una descripció del tipus de vi'}
				lblSpech={'Descripció del tipus de vi'}
			/>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleCreateWineType}>Crea</Button
		>
		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white">Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
