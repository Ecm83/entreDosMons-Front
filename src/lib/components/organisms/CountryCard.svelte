<script>
	import banderas from '$lib/banderas';
	import { deleteCountry, getAllCountries, updateCountry } from '$lib/api/';
	import { Button, Label, Modal, Input } from 'flowbite-svelte';
	import VoiceRecognition from '../molecules/VoiceRecognition.svelte';
	export let id;

	export let country;
	export let description;

	$: flag = banderas[country.toLowerCase()];

	let openModal = false;
	let size;

	const handleUpdateCountry = async () => {
		const result = await updateCountry(id, country, description);
		if (result.message === `Country with ID: ${id} updated successfully`) {
			await getAllCountries();
		} else {
			console.error('Error updating country');
		}
	};

	const handleDelete = async () => {
		const result = await deleteCountry(id);
		if (result.message === `Country with ID: ${id} deleted successfully`) {
			await getAllCountries();
		} else {
			console.error('Error deleting country');
		}
	};
</script>

<div class="w-full" data-id={id}>
	<div class="bg-white rounded-lg shadow-lg p-3 hover:bg-secondary-50/5 transition-all">
		<div class="flex">
			<div class="flag">
				<img
					class="h-16 object-fill object-center mb-4 aspect-video w-full border border-black rounded"
					src={flag}
					alt={country}
				/>
			</div>
			<h2 class="text-xl font-bold mt-4 ml-4">{country}</h2>
		</div>
		<hr class="mt-4 mb-4" />
		<p>{description}</p>
		<hr class="mt-4 mb-4" />
		<div class="flex gap-3 mt-2 justify-end">
			<div class="edit">
				<button class="bg-ok-50 hover:bg-ok-100 text-white font-bold py-1 px-2 rounded"
					><svg
						class="w-4 h-4 text-white dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
						on:click={() => {
							size = 'xs';
							openModal = true;
						}}
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
						/>
					</svg>
				</button>
			</div>
			<div class="delete">
				<button
					on:click={handleDelete}
					class="bg-delete-50 hover:bg-delete-100 text-white font-bold py-1 px-2 rounded"
					><svg
						class="w-4 h-4 text-white dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>

<Modal title="Modificar país" bind:open={openModal} {size} autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Label for="country" class="mb-2">Nom del país</Label>
			<Input
				divId="country"
				inputDescription="Introdueix un país"
				inputType="text"
				bind:value={country}
			/>
		</div>
		<div class="mb-4">
			<VoiceRecognition
				forLbl="country"
				lblTxt="Descripció del País"
				id="description"
				placeholder="Introdueix un país"
				name="country"
				bind:textValue={description}
			/>
		</div>
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

<style>
</style>
