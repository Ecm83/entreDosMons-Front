<script>
	import { Textarea } from 'flowbite-svelte';

	export let id;
	export let placeholder;

	export let rows = '4';
	export let txtClass = 'focus:ring-0  focus:border-primary-50 focus:border-[1.5px]';
	export let txtValue;
</script>

<Textarea {id} {placeholder} {rows} class={txtClass} bind:value={txtValue} unWrappedClass />
