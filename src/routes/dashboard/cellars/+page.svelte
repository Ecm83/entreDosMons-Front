<!-- <script>
	import CustomButton from '$lib/components/CustomButton.svelte';
	// import { onMount } from 'svelte';
	import { regions, grapes, cellars } from '$lib/stores';
	import { Modal } from 'flowbite-svelte';
	import DoubleSelect from '../../../lib/components/molecules/DoubleSelect.svelte';
	let openModal = false;
	let size;

	// let regionsData = [];
	// let grapesData = [];
	// let cellarsData = [];

	$: $regions, (regionsData = $regions);
	$: $grapes, (grapesData = $grapes);
	$: $cellars, (cellarsData = $cellars);

	// onMount(async () => {
	// 	if (regionsData.length === 0) {
	// 		await getAllRegions();
	// 	}

	// 	if (grapesData.length === 0) {
	// 		await getAllGrapes();
	// 	}

	// 	if (cellarsData.length === 0) {
	// 		await getAllCellars();
	// 	}
	// });
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading">
		Cellers <CustomButton
			buttonText={'Crea nou celler'}
			btnClasses={'text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				size = 'xs';
				openModal = true;
			}}
		/>
	</h1>
</div>

<DoubleSelect></DoubleSelect>

<Modal></Modal> -->
