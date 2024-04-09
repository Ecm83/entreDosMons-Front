<script>
	// import CustomButton from '$lib/components/CustomButton.svelte';
	import { onMount } from 'svelte';
	import { cellars } from '$lib/stores';
	import { getAllCellars } from '$lib/api';
	import Input from '../../../lib/components/Input.svelte';
	import CustomTextArea from '../../../lib/components/CustomTextArea.svelte';
	import CustomButton from '../../../lib/components/CustomButton.svelte';
	import { Modal, Button } from 'flowbite-svelte';
	import CellarCard from '$lib/components/atoms/CellarCard.svelte';

	let openModal = false;
	let size;

	let cellarsData = [];
	let cellarName = '';
	let distance = '';
	let cellarDescription = '';

	$: $cellars, (cellarsData = $cellars);

	const handleCreateCellar = async () => {
		console.log('log de cellarName:', cellarName);
		console.log('log de distance:', distance);
		console.log('log de cellarDescription:', cellarDescription);
	};

	onMount(async () => {
		if (cellarsData.length === 0) {
			await getAllCellars();
		}
	});
</script>

<div>
	<div class="container mx-auto p-4 rounded-lg w-full">
		<h1 class="heading">
			Cellers
			<CustomButton
				buttonText={'Crea nou celler'}
				btnClasses={'text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
				handleClick={() => {
					size = 'xs';
					openModal = true;
				}}
			/>
		</h1>

		{#if cellarsData.length === 0}
			<div class="flex items-center w-full gap-4">
				<p>No hi ha cellers per mostrar.</p>
				<CustomButton
					handleClick={() => console.log('click')}
					btnClasses={'text-white bg-upload-50 hover:bg-upload-100 text-base hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
					buttonText={'Crea el primer'}
				/>
			</div>
		{:else}
			<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
				{#each cellarsData as cellar (cellar.id)}
					<CellarCard
						name={cellar.cellar}
						distance={cellar.distance}
						description={cellar.description}
						id={cellar.id}
					/>
				{/each}
			</div>
		{/if}
	</div>

	<Modal title="Crear nou celler" bind:open={openModal} {size} autoclose>
		<div class="flex">
			<Input inputDescription={'Nom del celler'} inputType={'text'} bind:inputValue={cellarName} />
			<Input inputDescription={'Distáncia Km'} inputType={'number'} bind:inputValue={distance} />
		</div>

		<CustomTextArea
			forLbl={'cellarDescription'}
			lblTxt={'Descripció del celler'}
			bind:txtValue={cellarDescription}
		/>

		<svelte:fragment slot="footer">
			<Button
				class={'text-white w-48 bg-ok-50 hover:bg-ok-100  m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
				on:click={handleCreateCellar}>Crea</Button
			>
			<Button
				class="text-white bg-delete-50 hover:bg-delete-100 m-0 text-basehover:shadow-custom focus:outline-none focus:ring-0 border-0
				hover:scale-50 transition-transform color-white">Cancel·la</Button
			>
		</svelte:fragment>
	</Modal>
</div>
