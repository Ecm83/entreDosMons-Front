<script>
	import { onMount } from 'svelte';
	import { getAllRegions, getAllCountries } from '$lib/api';
	import { countries, regions } from '$lib/stores';

	let regionsData = [];
	let countriesData = [];

	$: $regions, (regionsData = $regions);
	$: $countries, (countriesData = $countries);

	$: onMount(async () => {
		if (countriesData.length === 0) {
			await getAllCountries();
		}

		if (regionsData.length === 0) {
			await getAllRegions();
		}
	});
</script>

<h1 class="heading">Regions</h1>
<ul>
	{#each regionsData as region}
		<li>{region.region}</li>
	{/each}
</ul>

<ul>
	{#each countriesData as country}
		<li>{country.country}</li>
	{/each}
</ul>
