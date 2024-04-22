<script>
	import { getAllGrapes } from '$lib/api';
	import { onMount } from 'svelte';
	import { CustomButton, UserAlert } from '$lib/components/atoms';
	import { grapes } from '$lib/stores';
	import { GrapeCard, GrapesCreateModal } from '$lib/components/organisms';

	let openModal = false;

	let grapesData = [];

	$: $grapes, (grapesData = $grapes);

	let showAlert = false;
	let alertColor = '';
	let alertType = '';
	let alertText = '';

	const handleCreate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText = e.detail.status === 'success' ? 'Nou raïm creat' : `No s'ha pogut crear el raïm.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleDelete = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText = e.detail.status === 'success' ? 'Raïm eliminat' : `No s'ha pogut eliminar el raïm.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	const handleUpdate = (e) => {
		showAlert = true;
		alertColor = e.detail.status === 'success' ? 'green' : 'red';
		alertType = e.detail.status === 'success' ? 'Èxit' : 'Error';
		alertText =
			e.detail.status === 'success' ? 'Raïm actualitzat' : `No s'ha pogut actualitzar el raïm.`;
		setTimeout(() => {
			showAlert = false;
		}, 3000);
	};

	onMount(async () => {
		await getAllGrapes();
	});
</script>

{#if showAlert}
	<UserAlert color={alertColor} infoAlert={alertType} infoText={alertText} />
{/if}
<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Raïms <CustomButton
			buttonText={'Crea raïm'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => (openModal = true)}
		/>
	</h1>
	{#if grapesData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha raïms per mostrar.Crea el primer amb el botó "Crea raïm"</p>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each grapesData as grape (grape.id)}
				<GrapeCard
					on:updateGrape={handleUpdate}
					on:deleteGrape={handleDelete}
					grape={grape.grape}
					description={grape.description}
					id={grape.id}
				/>
			{/each}
		</div>
	{/if}
</div>

<GrapesCreateModal bind:openModal on:createGrape={handleCreate} />
