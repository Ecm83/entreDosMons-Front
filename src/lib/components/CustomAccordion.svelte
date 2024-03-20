<script>
	import { onMount } from 'svelte';
	import { addCountry, getCountryByName } from './../api/countryCalls.js';
	import SaveButton from './SaveButton.svelte.js';
	import { AccordionItem, Accordion, Button, Input, Label } from 'flowbite-svelte';
	import AutoComplete from 'simple-svelte-autocomplete';
	// import UpdateButton from './UpdateButton.svelte';
	// import DeleteButton from './DeleteButton.svelte';
	import CustomTextArea from './CustomTextArea.svelte.js';

	let countries = [];
	$: newCountry = '';
	let selectedCountry = '';
	$: description = '';
	let willCreateCountry = false;
	$: loading = false;

	const handleCreateCountry = async () => {
		const createdCountry = await addCountry(newCountry, description);
		if (createdCountry && createdCountry.countries && createdCountry.countries.country) {
			countries = [...countries, createdCountry.countries.country];
			console.log(createdCountry.countries.country);
		} else {
			console.error('Unexpected response from API:', createdCountry);
		}
	};

	const handleNewCountry = async () => {
		willCreateCountry = !willCreateCountry;
		if (selectedCountry !== '') {
			loading = true;
			const editingCountry = await getCountryByName(selectedCountry);
			if (editingCountry && typeof editingCountry.country === 'string') {
				console.log(editingCountry);
				newCountry = editingCountry.country;
				description = editingCountry.description;
			} else {
				console.error('Unexpected response from API:', editingCountry);
			}
			loading = false;
		} else {
			newCountry = '';
			description = '';
		}
	};

	// const handleDeleteCountry = () => {
	// 	console.log(newCountry);
	// };

	onMount(async () => {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/countries`);
		const data = await response.json();
		countries = data.map((country) => country.country);
		console.log(countries);
	});
</script>

<div class="lg:w-9/12 mx-auto">
	<Accordion>
		<AccordionItem>
			<span slot="header">País</span>
			<div class="flex flex-col">
				<div class="flex gap-x-3 items-center pb-4">
					<p>Select country</p>
					<AutoComplete
						items={countries}
						bind:selectedItem={selectedCountry}
						required={true}
						class={'h-10 w-60 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'}
						onChange={() => (willCreateCountry = false)}
					/>
					<span>or</span>
					<Button
						class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
						on:click={handleNewCountry}
					>
						Create new country
					</Button>
				</div>
				{#if willCreateCountry}
					{#if loading}
						<p>Loading...</p>
					{:else}
						<div class="bg-green-200 rounded-md p-3">
							<p>Crear un nuevo pais si no existe en la lista:</p>
							<Label for="country" class="mb-2">Country name</Label>

							<Input
								divId="country"
								inputDescription="Introdueix un país"
								inputType="text"
								bind:value={newCountry}
							/>

							<CustomTextArea
								forLbl="country"
								lblTxt="Descripción del País"
								id="description"
								placeholder="Introdueix un país"
								name="country"
								bind:txtValue={description}
							/>

							<div class="flex gap-3">
								<Button
									class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
									on:click={handleCreateCountry}
								>
									Guardar
								</Button>
								<Button
									class={'text-white w-48 bg-delete-50 hover:bg-delete-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
									on:click={(willCreateCountry = false)}
								>
									Cancelar
								</Button>
							</div>
						</div>
					{/if}
				{/if}
				<!-- <SaveButton handleSave={handleCreateCountry} /> -->
				<!-- <UpdateButton handleUpdate={handleUploadCountry} />
				<DeleteButton handleDelete={handleDeleteCountry} /> -->
			</div>
		</AccordionItem>

		<AccordionItem>
			<span slot="header">Regió</span>
			<div class="flex gap-x-3 justify-items-center content-center">
				<SaveButton />
			</div>
		</AccordionItem>
	</Accordion>
</div>
