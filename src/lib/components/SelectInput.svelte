<script>
	import { Select } from 'flowbite-svelte';
	export let selected;
	export let placeholder = 'Type your input text';
	export let id;
	export let customClass = 'focus:border-black-2 w-full h-12 ';

	export let items;
</script>

<Select {id} size="md" class={customClass} {items} bind:value={selected} {placeholder} />
