<script>
	import { getWineTypes } from '$lib/api/wineTypesCalls';
	import { wineTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { CustomButton, UserAlert } from '$lib/components/atoms';
	import { WineTypesCard, WineTypesCreateModal } from '$lib/components/organisms';

	let openModal = false;

	let wineTypesData = [];

	$: $wineTypes, (wineTypesData = $wineTypes);

	let showAlert = false;
	let alertColor = '';
	let alertType = '';
	let alertText = '';

	const handleUpdate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success'
				? 'Nou tipus de vi acrualitzat.'
				: `No s'ha pogut actualitzar el tipus de vi.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleDelete = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success'
				? 'Tipus de vi eliminat.'
				: `No s'ha pogut eliminar el tipus de vi.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

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

	onMount(async () => {
		console.log('wineTypes:', wineTypesData);
		if (wineTypesData.length === 0) {
			await getWineTypes();
		}
	});
</script>

{#if showAlert}
	<UserAlert color={alertColor} infoAlert={alertType} infoText={alertText} />
{/if}

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Tipus de vi <CustomButton
			buttonText={'Crea nou tipus de vi'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
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
					on:updateWineType={handleUpdate}
					on:deleteWineType={handleDelete}
					wineType={wineType.wineType}
					description={wineType.description}
					id={wineType.id}
				/>
			{/each}
		</div>
	{/if}
</div>

<WineTypesCreateModal bind:openModal on:createWineType={handleCreate} />
