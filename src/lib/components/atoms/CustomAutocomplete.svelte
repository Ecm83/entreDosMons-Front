<script>
	import AutoComplete from 'simple-svelte-autocomplete';

	export let items; // add this line
	export let selectedItem;
	export let required = true;
	export let cssClass =
		'h-10 w-60 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent';
</script>

<AutoComplete {items} bind:selectedItem {required} class={cssClass} />
