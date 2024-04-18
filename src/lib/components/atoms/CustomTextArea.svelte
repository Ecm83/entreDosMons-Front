<script>
	import { Textarea } from 'flowbite-svelte';

	/**
	 * @param {string} id - The id of the textarea
	 * @param {string} placeholder - The placeholder of the textarea
	 * @param {string} rows - The number of rows of the textarea
	 * @param {string} txtClass - The class
	 * @param {string} txtValue - The value of the textarea
	 */

	export let id;
	export let placeholder;
	export let rows = '4';
	export let txtClass = 'focus:ring-0  focus:border-primary-50 focus:border-[1.5px]';
	export let txtValue;
</script>

<Textarea {id} {placeholder} {rows} class={txtClass} bind:value={txtValue} unWrappedClass />
