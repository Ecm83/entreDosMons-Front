<script>
	import { getWineTypes, addWineType } from '$lib/api/wineTypesCalls';
	import { wineTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { Button, Input, Label, Modal } from 'flowbite-svelte';
	import { CustomTextArea, CustomButton } from '$lib/components/atoms';
	import { WineTypesCard } from '$lib/components/organisms';

	let openModal = false;
	let size;

	let wineTypesData = [];

	$: $wineTypes, (wineTypesData = $wineTypes);
	$: newWineTipe = '';
	$: description = '';

	const handleCreateWineType = async () => {
		const createdWineType = await addWineType(newWineTipe, description);
		if (createdWineType.message === 'Wine type created successfully') {
			await getWineTypes();
		} else {
			console.error('Error creating wine type');
		}
		newWineTipe = '';
		description = '';
	};

	onMount(async () => {
		console.log('wineTypes:', wineTypesData);
		if (wineTypesData.length === 0) {
			await getWineTypes();
		}
	});
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Tipus de vi <CustomButton
			buttonText={'Crea nou tipus de vi'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				size = 'xs';
				openModal = true;
			}}
		/>
	</h1>

	{#if wineTypesData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha tipus de vi per mostrar, introdueix el primer</p>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each wineTypesData as wineType}
				<WineTypesCard
					name={wineType.wineType}
					description={wineType.description}
					id={wineType.id}
				/>
			{/each}
		</div>
	{/if}
</div>

<Modal title="Crear nou tipus de vi" bind:open={openModal} {size} autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4">
			<Label for="wine-type" class="mb-2">Wine Type</Label>
			<Input
				divId="wine-type"
				inputDescription="Introdueix un nou tipus de vi"
				inputType="text"
				bind:value={newWineTipe}
			/>
		</div>
		<div class="mb-4">
			<CustomTextArea
				forLbl="description"
				lblTxt="Descripció del tipus de vi"
				id="description"
				placeholder="Introdueix la descripció del tipus de vi"
				name="description"
				bind:txtValue={description}
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
