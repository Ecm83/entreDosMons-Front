<script>
	import { getAllSoils } from '$lib/api';
	import { onMount } from 'svelte';
	import { CustomButton, UserAlert } from '$lib/components/atoms';
	import { soils } from '$lib/stores';
	import { SoilCard, SoilCreateModal } from '$lib/components/organisms';

	let openModal = false;

	let soilsData = [];

	$: $soils, (soilsData = $soils);

	let showAlert = false;
	let alertColor = '';
	let alertType = '';
	let alertText = '';

	const handleCreate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success'
				? 'Nou tipus de vi creat'
				: `No s'ha pogut crear el tipus de vi.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleUpdate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success' ? 'Sòl actualitzat.' : `No s'ha pogut actualitzar el sòl.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleDelete = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText = e.detail.status === 'success' ? 'Sòl eliminat.' : `No s'ha pogut eliminar el sòl.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	onMount(async () => {
		await getAllSoils();
	});
</script>

{#if showAlert}
	<UserAlert color={alertColor} infoAlert={alertType} infoText={alertText} />
{/if}
<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Sòls <CustomButton
			buttonText={'Crea sòl'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				openModal = true;
			}}
		/>
	</h1>
	{#if soilsData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha sòls per mostrar.Crea el primer amb el botó "Crea sòl"</p>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each soilsData as soil (soil.id)}
				<SoilCard
					on:updateSoil={handleUpdate}
					on:deleteSoil={handleDelete}
					soil={soil.soil}
					effect={soil.effect}
					description={soil.description}
					id={soil.id}
				/>
			{/each}
		</div>
	{/if}
</div>

<SoilCreateModal bind:openModal on:createSoil={handleCreate} />
