<script>
	import { Select } from 'flowbite-svelte';
	export let selected;
	export let placeholder = 'Type your input text';
	export let id;
	export let customClass = 'focus:ring-0  focus:border-primary-50 focus:border-[1.5px]';

	export let items;
</script>

<Select
	{id}
	size="md"
	class={customClass}
	{items}
	bind:value={selected}
	{placeholder}
	unWrappedClass
/>
