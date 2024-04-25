<script>
	import { VoiceRecognition } from '$lib/components/molecules';
	import { countries } from '$lib/stores';
	import { Modal, Button } from 'flowbite-svelte';
	import { SelectInput, Input } from '$lib/components/atoms';
	import { createEventDispatcher } from 'svelte';
	import { getAllRegions, addRegion } from '$lib/api'; // Añade esta línea

	export let openModal = false;

	let countriesData = [];
	const dispatch = createEventDispatcher();

	$: newRegion = '';
	$: description = '';
	$: countryId = '';

	$: $countries, (countriesData = $countries);
	$: countriesName = countriesData.map((country) => {
		return {
			name: country.country,
			value: country.id
		};
	});

	const handleCreateRegion = async () => {
		console.log('log de countryId:', countryId);
		const createdRegion = await addRegion(newRegion, description, countryId);
		console.log('log de createdRegion', createdRegion);
		if (createdRegion.message === 'Region created successfully') {
			await getAllRegions();
			dispatch('createRegion', { status: 'success' });
		} else {
			console.error('Error creating region');
			dispatch('createRegion', { status: 'error' });
		}
		newRegion = '';
		description = '';
		countryId = '';
	};

	const handleCloseModal = () => {
		openModal = false;
	};
</script>

<Modal title="Crear nou país" bind:open={openModal} size="sm" autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<SelectInput
				placeholder="Selecciona un país"
				items={countriesName}
				id="countrySelect"
				bind:selected={countryId}
			/>

			<Input
				divId="region"
				inputDescription="Introdueix un regió"
				inputType="text"
				placeholder="Introdueix una regió"
				bind:inputValue={newRegion}
			/>
		</div>
		<div class="mb-4">
			<VoiceRecognition
				lblSpech="Descripció de la regió"
				placeholder="Introdueix una drecripció de la regió"
				bind:textValue={description}
			/>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleCreateRegion}>Crea</Button
		>
		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
            hover:scale-50 transition-transform color-white"
			on:click={handleCloseModal}>Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
