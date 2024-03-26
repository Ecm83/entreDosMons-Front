<script>
	import { onMount } from 'svelte';
	import { getSulphites, addSulphite } from '$lib/api/sulphitesCalls';
	import { sulphites } from '$lib/stores/sulphites';
	import CustomButton from '../../../lib/components/CustomButton.svelte';
	import Input from '../../../lib/components/Input.svelte';
	import SulphiteCard from '../../../lib/components/atoms/SulphiteCard.svelte';
	import { Modal, Button } from 'flowbite-svelte';

	let openModal = false;
	let size = '500px';

	let sulphitesData = [];

	$: $sulphites, (sulphitesData = $sulphites);
	$: newSulphiteMin = '';
	$: newSulphiteMax = '';

	const handleCreateSulphite = async () => {
		const createdSulphite = await addSulphite(newSulphiteMin, newSulphiteMax);
		if (createdSulphite.message === 'Sulphite created succesfully') {
			await getSulphites();
		} else {
			console.error('Error creating sulphite');
		}
	};

	onMount(async () => {
		console.log('log sulphitesData in page sulphites', sulphitesData);
		if (sulphitesData.length === 0) {
			await getSulphites();
		}
	});
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Sulfits <CustomButton
			buttonText={'Crea nou sulfit'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				size = 'xs';
				openModal = true;
			}}
		/>
	</h1>

	{#if sulphitesData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha sulfits per mostrar.</p>
			<CustomButton
				handleClick={() => console.log('click')}
				btnClasses={'text-white bg-upload-50 hover:bg-upload-100 text-base hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
				buttonText={'Crea el primer'}
			/>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each sulphitesData as sulphite (sulphite.id)}
				<SulphiteCard
					sulphiteMin={sulphite.sulphiteMin}
					sulphiteMax={sulphite.sulphiteMax}
					id={sulphite.id}
				/>
			{/each}
		</div>
	{/if}
</div>

<!-- !-------------------------------- -->
<!-- TODO: input min can't be greater than max and viceversa, also can't be empty and can't be negative -->

<Modal title="Crear nou sulfit" bind:open={openModal} {size} autoclose>
	<div class="rounded-md p-3">
		<div class="mb-4 flex justify-center items-center">
			<p>De</p>
			<Input
				divId="sulphiteMin"
				inputDescription="Min"
				inputType="number"
				bind:inputValue={newSulphiteMin}
				inputClass={'w-[65px] focus:border-black'}
			/>
			<p>a</p>
			<Input
				divId="sulphiteMax"
				inputDescription="Max"
				inputType="number"
				bind:inputValue={newSulphiteMax}
				inputClass={'w-[65px] focus:border-black'}
			/>
			<p>Mg/l de sulfits</p>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<Button
			class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
			on:click={handleCreateSulphite}>Create</Button
		>
	</svelte:fragment>
</Modal>
