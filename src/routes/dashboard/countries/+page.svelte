<script>
	import { getAllCountries } from '$lib/api/countryCalls';
	import { countries } from '$lib/stores';
	import { onMount } from 'svelte';
	import { CustomButton, UserAlert } from '$lib/components/atoms';
	import { CountryCard, CountryCreateModal } from '$lib/components/organisms';

	let openModal = false;

	let countriesData = [];

	$: $countries, (countriesData = $countries);

	let showAlert = false;
	let alertColor = '';
	let alertType = '';
	let alertText = '';

	const handleUpdate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success' ? 'País actualitzat' : `No s'ha pogut actualitzar el país.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleDelete = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success' ? 'País eliminat.' : `No s'ha pogut eliminar el país.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleCreate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText = e.detail.status === 'success' ? 'Nou país creat' : `No s'ha pogut crear el país.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	onMount(async () => {
		console.log('countries:', countriesData);
		if (countriesData.length === 0) {
			await getAllCountries();
		}
	});
</script>

{#if showAlert}
	<UserAlert color={alertColor} infoAlert={alertType} infoText={alertText} />
{/if}

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Països <CustomButton
			buttonText={'Crea nou país'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				openModal = true;
			}}
		/>
	</h1>

	{#if countriesData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha països per mostrar, introdueix el primer</p>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each countriesData as country}
				<CountryCard
					on:updateCountry={handleUpdate}
					on:deleteCountry={handleDelete}
					country={country.country}
					description={country.description}
					id={country.id}
				/>
			{/each}
		</div>
	{/if}
</div>

<CountryCreateModal bind:openModal on:createCountry={handleCreate} />
