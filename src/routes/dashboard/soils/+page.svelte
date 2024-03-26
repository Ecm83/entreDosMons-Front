<script>
	import { soils } from '$lib/stores';
	import { onMount } from 'svelte';
	import { getAllSoils, addSoil } from '$lib/api/soilCalls';
	import CustomButton from '$lib/components/CustomButton.svelte';
	import SoilCard from '../../../lib/components/atoms/SoilCard.svelte';
	import { Button, Modal } from 'flowbite-svelte';
	import Input from '$lib/components/Input.svelte';

	let openModal = false;
	let size;

	let soilsData = [];
	console.log('14', soilsData);

	$: $soils, (soilsData = $soils);
	$: description = '';
	$: effect = '';
	$: newSoil = '';

	const handleCreateSoil = async () => {
		const createdSoil = await addSoil(newSoil, description, effect);
		if (createdSoil.message === 'Soil created succesfully') {
			await getAllSoils();
		} else {
			console.error('Error creating soil');
		}
		newSoil = '';
		description = '';
		effect = '';
	};

	onMount(async () => {
		console.log('34', soilsData);
		if (soilsData.length === 0) {
			await getAllSoils();
		}
	});
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Terres <CustomButton
			buttonText={'Crea nou terra'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				size = 'xs';
				openModal = true;
			}}
		/>
	</h1>

	{#if soilsData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha terres per mostrar.</p>
			<CustomButton
				handleClick={() => console.log('click')}
				btnClasses={'text-white bg-upload-50 hover:bg-upload-100 text-base hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
				buttonText={'Crea el primer'}
			/>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each soilsData as soil (soil.id)}
				<SoilCard
					soil={soil.soil}
					description={soil.description}
					effect={soil.effect}
					id={soil.id}
				/>
			{/each}
		</div>
	{/if}
</div>

<Modal title="Crea un nou terra" bind:open={openModal} {size} autoclose>
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
	</svelte:fragment>
</Modal>
