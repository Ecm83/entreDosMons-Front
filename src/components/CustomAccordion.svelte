<script>
	import { onMount } from 'svelte';
	import { addCountry } from './../api/countryCalls.js';
	import SaveButton from './SaveButton.svelte';
	import { AccordionItem, Accordion } from 'flowbite-svelte';
	import AutoComplete from 'simple-svelte-autocomplete';
	import UpdateButton from './UpdateButton.svelte';
	import DeleteButton from './DeleteButton.svelte';
	import CustomTextArea from './CustomTextArea.svelte';
	import Input from './Input.svelte';

	let countries = [];
	let newCountry = '';
	let description = '';
	let test = '';

	const handleCreateCountry = async () => {
		await addCountry(newCountry, description);
		countries = [...countries, newCountry];
		console.log(newCountry);
	};

	const handleUploadCountry = () => {
		console.log(newCountry);
	};

	const handleDeleteCountry = () => {
		console.log(newCountry);
	};

	onMount(async () => {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/countries`);
		const data = await response.json();
		countries = data.map((country) => country.country);
	});
</script>

<Accordion>
	<AccordionItem>
		<span slot="header">País</span>
		<div class="flex gap-x-3 justify-items-center content-center">
			<Input bind:inputValue={test} />
			<AutoComplete
				items={countries}
				bind:selectedItem={newCountry}
				required={true}
				class={'h-10 w-60 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'}
			/>
			<SaveButton handleSave={handleCreateCountry} />
			<UpdateButton handleUpdate={handleUploadCountry} />
			<DeleteButton handleDelete={handleDeleteCountry} />
		</div>
		<CustomTextArea
			forLbl="country"
			lblTxt="País"
			id="country"
			placeholder="Introdueix un país"
			name="country"
			bind:txtValue={description}
		/>
	</AccordionItem>

	<AccordionItem>
		<span slot="header">Regió</span>
		<div class="flex gap-x-3 justify-items-center content-center">
			<SaveButton />
		</div>
	</AccordionItem>
</Accordion>
