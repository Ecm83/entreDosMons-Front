<script>
	import CountryCard from '$lib/components/atoms/CountryCard.svelte';
	import { addCountry } from '$lib/api/countryCalls';
	import { countries } from '$lib/stores';
	import { onMount } from 'svelte';
	import { getAllCountries } from '$lib/api/countryCalls';
	import CustomButton from '$lib/components/CustomButton.svelte';
	import { Button, Input, Label, Modal } from 'flowbite-svelte';
	import CustomTextArea from '$lib/components/CustomTextArea.svelte';
	let openModal = false;
	let size;

	let countriesData = [];

	$: $countries, (countriesData = $countries);
	$: description = '';
	$: newCountry = '';

	const handleCreateCountry = async () => {
		const createdCountry = await addCountry(newCountry, description);
		if (createdCountry.message === 'Country created succesfully') {
			await getAllCountries();
		} else {
			console.error('Error creating country');
		}
		newCountry = '';
		description = '';
	};

	onMount(async () => {
		console.log(countriesData);
		if (countriesData.length === 0) {
			await getAllCountries();
		}
	});
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Paísos <CustomButton
			buttonText={'Crea nou país'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				size = 'xs';
				openModal = true;
			}}
		/>
	</h1>

	{#if countriesData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha paísos per mostrar.</p>
			<CustomButton
				handleClick={() => console.log('click')}
				btnClasses={'text-white bg-upload-50 hover:bg-upload-100 text-base hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
				buttonText={'Crea el primer'}
			/>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each countriesData as country (country.id)}
				<CountryCard name={country.country} description={country.description} id={country.id} />
			{/each}
		</div>
	{/if}
</div>

<Modal title="Crear nuevo país" bind:open={openModal} {size} autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Label for="country" class="mb-2">Country name</Label>
			<Input
				divId="country"
				inputDescription="Introdueix un país"
				inputType="text"
				bind:value={newCountry}
			/>
		</div>
		<div class="mb-4">
			<CustomTextArea
				forLbl="country"
				lblTxt="Descripción del País"
				id="description"
				placeholder="Introdueix un país"
				name="country"
				bind:txtValue={description}
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
