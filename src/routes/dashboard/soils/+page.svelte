<script>
	import { soils } from '$lib/stores';
	import { onMount } from 'svelte';
	import { getAllSoils } from '$lib/api/soilCalls';
	import { CustomButton, UserAlert } from '$lib/components/atoms';
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

	onMount(async () => {
		console.log('34', soilsData);
		if (soilsData.length === 0) {
			await getAllSoils();
		}
	});
</script>

{#if showAlert}
	<UserAlert color={alertColor} type={alertType} text={alertText} />
{/if}

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Terres <CustomButton
			buttonText={'Crea nou terra'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				openModal = true;
			}}
		/>
	</h1>

	{#if soilsData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha terres per mostrar.</p>
			<CustomButton
				handleClick={() => console.log('click')}
				btnClasses={'text-white bg-upload-50 hover:bg-upload-100 text-base hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
				buttonText={'Crea el primer'}
			/>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each soilsData as soil (soil.id)}
				<SoilCard
					soil={soil.soil}
					description={soil.description}
					effect={soil.effect}
					id={soil.id}
				/>
			{/each}
		</div>
	{/if}
</div>

<SoilCreateModal bind:openModal on:createSoil={handleCreate} />
