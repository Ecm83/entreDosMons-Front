<script>
	import { labels } from '$lib/stores';
	import { CustomButton } from '$lib/components/atoms';
	import { LabelCard } from '$lib/components/organisms';
	import { onMount } from 'svelte';
	import { getLabels } from '$lib/api/labelsCalls';

	let openModal = false;

	let labelsData = [];
	console.log('labels:', labelsData);

	$: $labels, (labelsData = $labels);

	onMount(async () => {
		console.log('labels:', labelsData);
		if (labelsData.length === 0) {
			await getLabels();
		}
	});
</script>

<div class="container mx-auto p-4 rounded-lg w-full">
	<h1 class="heading flex items-center gap-4 mb-">
		Característiques <CustomButton
			buttonText={'Crea característica'}
			btnClasses={' text-base focus:ring-0 transition-transform hover:text-secondary hover:bg-secondary-50/80 hover:text-white'}
			handleClick={() => {
				!openModal;
			}}
		/>
	</h1>

	{#if $labels.length === 0}
		<p>No hi ha cap característica per mostrar.</p>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each labelsData as label}
				<LabelCard name={label.name} description={label.description} id={'labelCard'} />
			{/each}
		</div>
	{/if}
</div>
