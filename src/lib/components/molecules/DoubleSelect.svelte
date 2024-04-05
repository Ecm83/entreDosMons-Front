<script>
	import { regions } from '$lib/stores';
	import { onMount } from 'svelte';
	import SelectInput from '../SelectInput.svelte';
	import { getAllRegions } from '$lib/api';
	let regionsData = [];
	console.log('regionsData:', regionsData);
	$: regions, (regionsData = $regions);
	let countryId = '';

	function getCountry() {
		const seen = {};
		return regionsData.reduce((acc, region) => {
			if (!seen[region.country.id]) {
				seen[region.country.id] = true;
				acc.push({
					name: region.country.country,
					value: region.country.id
				});
			}
			return acc;
		}, []);
	}

	function getRegionsByCountry(countryId) {
		console.log('log de countryId:', countryId);
		return regionsData
			.filter((region) => region.country.id === countryId)
			.map((region) => ({
				name: region.region,
				value: region.id
			}));
	}

	onMount(async () => {
		if (regionsData.length === 0) {
			console.log('regionsData:', regionsData);
			await getAllRegions();
		}
	});

	$: regionsName = getRegionsByCountry(countryId);

	console.log(regionsData.country);
</script>

<div class="flex m-0 w-full">
	<SelectInput
		placeholder="Selecciona un país"
		items={getCountry()}
		id="countrySelect"
		bind:selected={countryId}
	/>
	<SelectInput placeholder={'Regions'} inputClass={'m-0 '} items={regionsName} />
</div>
