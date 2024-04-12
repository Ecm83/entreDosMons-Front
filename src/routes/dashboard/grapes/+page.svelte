<script>
	import { getAllGrapes, addGrape } from '$lib/api';
	import { onMount } from 'svelte';
	import { CustomButton, CustomTextArea } from '$lib/components/atoms';
	import { grapes } from '$lib/stores';
	import { Button, Input, Label, Modal } from 'flowbite-svelte';
	import { GrapeCard } from '$lib/components/organisms';
	let openModal = false;
	let size = '';

	let grapesData = [];

	$: $grapes, (grapesData = $grapes);
	$: newGrape = '';
	$: description = '';

	const handleCreateGrape = async () => {
		const createdGrape = await addGrape(newGrape, description);
		if (createdGrape.message === 'Grape created successfully') {
			await getAllGrapes();
		} else {
			console.error('Error creating grape');
		}
		newGrape = '';
		description = '';
	};
	onMount(async () => {
		const grapes = await getAllGrapes();
		console.log(grapes);
	});
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Raïms <CustomButton
			buttonText={'Crea raïm'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				size = 'xs';
				openModal = true;
			}}
		/>
	</h1>
	{#if grapesData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha raïms per mostrar.Crea el primer amb el botó "Crea raïm"</p>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each grapesData as grape (grape.id)}
				<GrapeCard name={grape.grape} description={grape.description} id={grape.id} />
			{/each}
		</div>
	{/if}
</div>

<Modal title="Crear nuevo país" bind:open={openModal} {size} autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Label for="grape" class="mb-2">Grape name</Label>
			<Input
				divId="grape"
				inputDescription="Introdueix un raïm"
				inputType="text"
				bind:value={newGrape}
			/>
		</div>
		<div class="mb-4">
			<CustomTextArea
				forLbl="grapeDescription"
				lblTxt="Descripción del raïm"
				id="description"
				placeholder="Introdueix un raïm"
				name="grapeDescription"
				bind:txtValue={description}
			/>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleCreateGrape}>Crea</Button
		>
		<Button
			class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
			hover:scale-50 transition-transform color-white">Cancel·la</Button
		>
	</svelte:fragment>
</Modal>
