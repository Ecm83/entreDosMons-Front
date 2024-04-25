<script>
	import { labels } from '$lib/stores';
	import { CustomButton } from '$lib/components/atoms';
	import { LabelCard } from '$lib/components/organisms';

	let openModal = false;
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
			{#each $labels as label}
				<LabelCard mame={label.name} description={label.description} />
			{/each}
		</div>
	{/if}
</div>
