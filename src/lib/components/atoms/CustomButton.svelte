<script>
	import { Button } from 'flowbite-svelte';

	/**
	 * @param {string} buttonText - The text of the button
	 * @param {string} btnClasses - The classes of the button
	 * @param {function} handleClick - The function to execute when the button is clicked
	 
	*/
	export let buttonText;
	export let btnClasses;
	export let handleClick;
</script>

<Button outline on:click={handleClick} class={btnClasses}>{buttonText}</Button>
