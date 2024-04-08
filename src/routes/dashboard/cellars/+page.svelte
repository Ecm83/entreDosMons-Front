<script>
	// import CustomButton from '$lib/components/CustomButton.svelte';
	import { onMount } from 'svelte';
	import { regions, soils, cellars } from '$lib/stores';
	import { getAllRegions, getAllSoils, getAllCellars } from '$lib/api';
	import { MultiSelect, Label } from 'flowbite-svelte';
	import DoubleSelect from '../../../lib/components/molecules/DoubleSelect.svelte';
	let soilsSelected = [];
	// let openModal = false;
	// let size;

	let regionsData = [];
	let soilsData = [];
	let cellarsData = [];

	$: $regions, (regionsData = $regions);
	$: $cellars, (cellarsData = $cellars);
	$: $soils, (soilsData = $soils);

	$: soilsName = soilsData.map((soil) => {
		return {
			name: soil.soil,
			value: soil.id
		};
	});

	onMount(async () => {
		if (regionsData.length === 0) {
			await getAllRegions();
		}

		if (soilsData.length === 0) {
			await getAllSoils();
		}

		if (cellarsData.length === 0) {
			await getAllCellars();
		}
	});
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading">
		<!-- Cellers <CustomButton
			buttonText={'Crea nou celler'}
			btnClasses={'text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				size = 'xs';
				openModal = true;
			}}
		/> -->
	</h1>
</div>

<DoubleSelect></DoubleSelect>
<Label>
	Select an option
	<MultiSelect items={soilsName} bind:value={soilsSelected} size="lg" />
</Label>
