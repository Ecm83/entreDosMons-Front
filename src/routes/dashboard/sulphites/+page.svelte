<script>
	import { onMount } from 'svelte';
	import { getSulphites } from '$lib/api/sulphitesCalls';
	import { sulphites } from '$lib/stores/sulphites';
	import { CustomButton } from '$lib/components/atoms';
	import { SulphiteCard, SulphitesCreateModal } from '$lib/components/organisms';

	let openModal = false;

	let sulphitesData = [];

	$: $sulphites, (sulphitesData = $sulphites);

	const handleCreate = () => {
		openModal = false;
	};

	onMount(async () => {
		await getSulphites();
	});
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Sulfits <CustomButton
			buttonText={'Crea nou sulfit'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				openModal = true;
			}}
		/>
	</h1>

	{#if sulphitesData.length === 0}
		<div class="flex items-center w-full gap-4">
			<p>No hi ha sulfits per mostrar.</p>
			<CustomButton
				handleClick={() => console.log('click')}
				btnClasses={'text-white bg-upload-50 hover:bg-upload-100 text-base hover:shadow-custom focus:outline-none focus:ring-0 border-0 hover:scale-50 transition-transform color-white'}
				buttonText={'Crea el primer'}
			/>
		</div>
	{:else}
		<div class="gap-4 grid lg:grid-cols-3 sm:grid-cols-1">
			{#each sulphitesData as sulphite (sulphite.id)}
				<SulphiteCard
					sulphiteMin={sulphite.sulphiteMin}
					sulphiteMax={sulphite.sulphiteMax}
					id={sulphite.id}
				/>
			{/each}
		</div>
	{/if}
</div>

<SulphitesCreateModal bind:openModal on:createSulphite={handleCreate} />

<!-- ?-------------------------------- -->
<!-- TODO: input min can't be greater than max and viceversa, also can't be empty and can't be negative -->
