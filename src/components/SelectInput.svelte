<script>
	import { Select } from 'flowbite-svelte';
	export let selected;
	export let placeholder = 'Select a country';

	let countries = [
		{ value: 'us', name: 'United States' },
		{ value: 'ca', name: 'Canada' },
		{ value: 'fr', name: 'France' }
	];
</script>

<Select class="mt-2" items={countries} bind:value={selected} {placeholder} />
