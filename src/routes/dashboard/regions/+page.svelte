<script>
	import { onMount } from 'svelte';
	import { getAllRegions, getAllCountries, addRegion } from '$lib/api';
	import { countries, regions } from '$lib/stores';
	import CustomButton from '$lib/components/CustomButton.svelte';
	import RegionCard from '$lib/components/atoms/RegionCard.svelte';
	import { Button, Input, Label, Modal } from 'flowbite-svelte';
	import CustomTextArea from '$lib/components/CustomTextArea.svelte';

	let openModal = false;
	let size;

	let regionsData = [];
	let countriesData = [];

	$: $regions, (regionsData = $regions);
	$: $countries, (countriesData = $countries);
	let newRegion = '';
	let description = '';
	let countryId = '';

	const handleCreateRegion = async () => {
		const createdRegion = await addRegion(newRegion, description, countryId);
		if (createdRegion.message === 'Region created succesfully') {
			await getAllRegions();
		} else {
			console.error('Error creating region');
		}
		newRegion = '';
		description = '';
	};

	$: onMount(async () => {
		if (countriesData.length === 0) {
			await getAllCountries();
		}

		if (regionsData.length === 0) {
			await getAllRegions();
		}
	});
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Regions <CustomButton
			buttonText={'Crea nova regió'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				size = 'xs';
				openModal = true;
			}}
		/>
	</h1>

	{#if regionsData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha regions per mostrar.</p>
			<CustomButton
				handleClick={() => console.log('click')}
				btnClasses={'text-white bg-upload-50 hover:bg-upload-100 text-base hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
				buttonText={'Crea la primera'}
			/>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each regionsData as region (region.id)}
				<RegionCard
					region={region.region}
					id={region.id}
					description={region.description}
					regionCountries={region.country.country}
				/>
			{/each}
		</div>
	{/if}
</div>

<Modal title="Crear nova regió" bind:open={openModal} {size} autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Label for="country" class="mb-2">Nom de la regió</Label>
			<Input
				divId="region"
				inputDescription="Introdueix una regió"
				inputType="text"
				bind:value={newRegion}
			/>
		</div>
		<div class="mb-4">
			<CustomTextArea
				forLbl="description"
				lblTxt="Descripció de la regió"
				id="description"
				placeholder="Introdueix una regió"
				name="country"
				bind:txtValue={description}
			/>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleCreateRegion}>Crear</Button
		>
	</svelte:fragment>
</Modal>
