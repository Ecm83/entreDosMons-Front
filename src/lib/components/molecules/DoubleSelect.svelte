<script>
	import { countries } from '$lib/stores';
	import { onMount } from 'svelte';
	import { SelectInput } from '$lib/components/atoms';
	import { getAllCountries } from '$lib/api';

	let countriesData = [];
	console.log('regionsData:', countriesData);

	$: countries, (countriesData = $countries);
	let countryId = '';

	console.log('log de countriesData:', countriesData);

	$: {
		if (countriesData.length === 0) {
			getAllCountries().then((data) => {
				countriesData = data;
			});
		}
	}

	$: regionsName = getRegionsByCountry(countryId);

	function getCountries() {
		return countriesData.map((country) => ({
			name: country.country,
			value: country.id
		}));
	}

	function getRegionsByCountry(countryId) {
		console.log('log de countryId:', countryId);
		return countriesData
			.filter((country) => country.id === countryId)
			.map((country) => {
				return country.regions.map((region) => {
					return {
						name: region.region,
						value: region.id
					};
				});
			})[0];
	}

	onMount(async () => {
		if (countriesData.length === 0) {
			console.log('countriesData:', countriesData);
			countriesData = await getAllCountries();
		}
	});

	console.log(countriesData.country);
</script>

<div class="flex m-0 w-full">
	<SelectInput
		placeholder="Selecciona un país"
		items={getCountries()}
		id="countrySelect"
		bind:selected={countryId}
		unWrappedClass
	/>
	<SelectInput placeholder={'Regions'} inputClass={'m-0 '} items={regionsName} unWrappedClass />
</div>
