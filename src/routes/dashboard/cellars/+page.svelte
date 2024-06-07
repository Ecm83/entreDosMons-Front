<script>
	import { DoubleSelect, VoiceRecognition } from '$lib/components/molecules';
	import { onMount } from 'svelte';
	import { cellars, regions, suppliers, soils } from '$lib/stores';
	import { getAllCellars, getAllRegions, getSuppliers, getAllSoils } from '$lib/api';
	import { Input, CustomButton, SelectInput } from '$lib/components/atoms';
	import { Modal, Button, MultiSelect } from 'flowbite-svelte';
	import { CellarCard } from '$lib/components/organisms';

	let openModal = false;
	let size;
	let selectedCellar;

	let regionsData = [];
	let cellarsData = [];
	let soilsData = [];
	let suppliersData = [];
	let selectedSoils = [];

	let cellarName = '';
	let distance = '';
	let description = '';

	$: $regions, (regionsData = $regions);
	$: $cellars, (cellarsData = $cellars);

	$: $soils, (soilsData = $soils);
	$: soilsName = soilsData.map((soil) => {
		return {
			name: soil.soil,
			value: soil.id
		};
	});

	$: $suppliers, (suppliersData = $suppliers);
	$: suppliersName = suppliersData.map((supplier) => {
		return {
			name: supplier.companyName,
			value: supplier.id
		};
	});

	const handleCreateCellar = async () => {
		console.log('log de cellarName:', cellarName);
		console.log('log de distance:', distance);
		console.log('log de cellarDescription:', cellarDescription);
	};

	onMount(async () => {
		if (regionsData.length === 0) {
			await getAllRegions();
		}
		console.log('log de regionsData:', regionsData);
		if (cellarsData.length === 0) {
			await getAllCellars();
		}

		if (suppliersData.length === 0) {
			await getSuppliers();
		}

		if ($soils.length === 0) {
			// Asume que getAllSoils() es una función que actualiza $soils en tu tienda
			await getAllSoils();
		}
		soilsData = $soils;
		selectedSoils = soilsData.map((soil) => {
			return {
				label: soil.soil,
				value: soil.id
			};
		});
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
			<div class="gap-4 grid lg:grid-cols-2 sm:grid-cols-1">
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
		<div class="flex flex-col">
			<div class="flex mb-4">
				<Input
					inputDescription={'Nom del celler'}
					inputType={'text'}
					divId={'cellarName'}
					bind:inputValue={cellarName}
				/>
				<Input
					inputDescription={'Distáncia Km'}
					inputType={'number'}
					bind:inputValue={distance}
					divId={'distance'}
				/>
			</div>

			<SelectInput
				id={'selectCellar'}
				items={suppliersName}
				placeholder={'Selecciona un proveïdor'}
				customClass={'focus:border-black focus:ring-0 focus:border-[1.5px] mb-4'}
				bind:selected={selectedCellar}
			/>

			<!-- Aquí añadimos el DoubleSelect -->
			<div class="mb-4">
				<DoubleSelect />
			</div>

			<MultiSelect
				items={soilsName}
				bind:value={selectedSoils}
				size="lg"
				placeholder={'Selecciona els sols'}
			/>

			<VoiceRecognition
				lblSpech={'Descripció del celler'}
				bind:textValue={description}
				placeholder={'Introdueix una descripció del celler'}
			/>
		</div>

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
