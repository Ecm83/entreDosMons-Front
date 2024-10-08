<script>
	import { onMount } from 'svelte';
	import { getAllRegions, getAllCountries } from '$lib/api';
	import { countries, regions } from '$lib/stores';
	import { RegionCard } from '$lib/components/organisms';
	import { CustomButton, UserAlert } from '$lib/components/atoms';
	import { RegionCreateModal } from '$lib/components/organisms';

	let openModal = false;

	let regionsData = [];
	let countriesData = [];

	$: $regions, (regionsData = $regions);
	$: $countries, (countriesData = $countries);

	let showAlert = false;
	let alertColor = '';
	let alertType = '';
	let alertText = '';

	const handleCreate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success' ? 'Nova regió creada' : `No s'ha pogut crear la regió.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleDelete = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success' ? 'Regió eliminada' : `No s'ha pogut eliminar la regió.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	$: onMount(async () => {
		console.table(countriesData);
		if (countriesData.length === 0) {
			await getAllCountries();
		}

		if (regionsData.length === 0) {
			await getAllRegions();
		}
	});
</script>

{#if showAlert}
	<UserAlert color={alertColor} infoAlert={alertType} infoText={alertText} />
{/if}

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4">
		Regions <CustomButton
			buttonText={'Crea nova regió'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				openModal = true;
			}}
		/>
	</h1>

	{#if regionsData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha regions per mostrar.</p>
			<CustomButton
				handleClick={() => console.log('click')}
				btnClasses={'text-white bg-upload-50 hover:bg-upload-100 text-base hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
				buttonText={'Crea la primera'}
			/>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each regionsData as region (region.id)}
				<RegionCard
					region={region.region}
					id={region.id}
					countyId={region.countryId}
					description={region.description}
					regionCountries={region.country.country}
					on:deleteRegion={handleDelete}
				/>
			{/each}
		</div>
	{/if}
</div>

<RegionCreateModal bind:openModal on:createRegion={handleCreate} />
