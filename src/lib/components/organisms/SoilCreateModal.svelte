<script>
	import { Modal, Button } from 'flowbite-svelte';
	import { Input } from '$lib/components/atoms';
	import { addSoil, getAllSoils } from '$lib/api/soilCalls';
	import { createEventDispatcher, onMount } from 'svelte';

	export let openModal = false;

	let dispatch = createEventDispatcher();

	$: newSoil = '';
	$: description = '';
	$: effect = '';

	const handleCreateSoil = async () => {
		try {
			const createdSoil = await addSoil(newSoil, description, effect);
			if (createdSoil.message === 'Soil created succesfully') {
				await getAllSoils();
				dispatch('createSoil', { status: 'success' });
			}
		} catch (error) {
			console.error('Error creating soil');
			dispatch('createSoil', { status: 'error' });
		} finally {
			newSoil = '';
			description = '';
			effect = '';
		}
	};

	onMount(async () => {
		const soils = await getAllSoils();
		console.log(soils);
	});
</script>

<Modal title="Crea un nou terra" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Input
				divId="soil"
				inputType="text"
				inputDescription="Introdueix un terra"
				bind:inputValue={newSoil}
			/>
		</div>
		<div class="mb-4">
			<Input
				divId="description"
				inputType="text"
				inputDescription="Introdueix una descripció"
				bind:inputValue={description}
			/>
		</div>
		<div class="mb-4">
			<Input
				divId="effect"
				inputType="text"
				inputDescription="Introdueix un efecte"
				bind:inputValue={effect}
			/>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleCreateSoil}>Crear</Button
		>

		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white">Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
